const formidable = require('formidable');
const { createUser, retrieveUserByEmail } = require("../model/auth");
const bcrypt = require("bcrypt");

const checkUserAlreadyExists = async (email) => {
  let user = "";
  try {
    user = await retrieveUserByEmail(email);
  } catch (e) {
    console.log(e);
  }
  return user;
}

exports.createUser = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { email, password } = fields;
    let user = "";
    user = await checkUserAlreadyExists(email);
    if (user) {
      return res.status(400).json({
        error: "Email already exists!"
      })
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      console.log(email);
      console.log(hashedPassword);
      const newUser = await createUser(email, hashedPassword);
      return res.status(201).json({newUser});
    } catch (err) {
      return res.status(400).json({
        error: err,
      })
    }
  })
}
