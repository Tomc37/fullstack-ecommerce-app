require("dotenv").config();
const express = require("express");
app = express();

const port = process.env.PORT;

// Initialise bodyparser to parse req.body to json
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialise Cors for cross-origin requests
const cors = require("cors");
app.use(cors({
  credentials: true,
  origin: ["https://fullstack-ecommerce-app.herokuapp.com/, http://fullstack-ecommerce-app.herokuapp.com/"]
}));

// Initialise Morgan - Request Logger
const morgan = require("morgan");
app.use(morgan("dev"));

// Initialise Session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    secure: false
  })
);

// Initialise Passport + bcrypt
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

// Serialise and deserialise user
const { retrieveUserById } = require("./model/auth"); // DB function to retrieve user from id

passport.serializeUser((user, done) => {
  console.log("Serializing...")
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing...")
  let user = "";
  try {
    user = await retrieveUserById(id);
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

// Setup passport Local Strategy
const { retrieveUserByEmail } = require("./model/auth"); // DB function to retrieve user from email

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      let user = "";
      try {
        user = await retrieveUserByEmail(email);
      } catch (e) {
        return done(e);
      }
      // console.log(user);
      if (!user) {
        return done(null, false);
      }
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// Mount parent router to use index.js routes for home '/' path
const router = require("./routes/index.js");
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
