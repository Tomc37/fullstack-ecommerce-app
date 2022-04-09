const formidable = require('formidable');
const { changeEmail, changePassword } = require('../model/account');
const { retrieveUserByEmail, retrieveUserById } = require('../model/auth');
const bcrypt = require("bcrypt");


exports.changeEmail = (req, res, next) => {
  // console.log(req.user);
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { email, id } = fields;
    let user = "";
    user = await retrieveUserByEmail(email);
    if (user) {
      return res.status(400).json({
        error: "Email already exists!"
      })
    }
    try {
      const newUser = await changeEmail(email, id);
      return res.status(201).json({ data: newUser });
    } catch (err) {
      return res.status(400).json({
        err,
      })
    }
  })
}

exports.changePassword = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { oldPassword, newPassword, id } = fields;
    let user = "";
    user = await retrieveUserById(id);
    const matchedPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchedPassword) {
      return res.status(400).json({
        error: "Old password does not match!"
      })
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt) 
      const newUser = await changePassword(hashedPassword, id);
      return res.status(201).json({ data: newUser });
    } catch (err) {
      return res.status(400).json({
        err,
      })
    }
  })
}
