const db = require('./db');

const changeEmail = async (email, id) => {
  try {
    await db.query('UPDATE users SET email=$1 WHERE id=$2', [email, id]);
  } catch (e) {
    console.log(e);
  }
}

const changePassword = async (password, id) => {
  try {
    await db.query('UPDATE users SET password=$1 WHERE id=$2', [password, id])
  } catch (e) {
    console.log(e);
  }
}


module.exports = {
  changeEmail,
  changePassword
}