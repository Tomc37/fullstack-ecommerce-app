const db = require('./db');
const {v4: uuidv4} = require("uuid");

const retrieveUserByEmail = async (email) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows[0];
  } catch (e) {
    console.log(e);
  }
}

const retrieveUserById = async (id) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.rows[0];
  } catch (e) {
    console.log(e);
  }
}

const createUser = async (email, password) => {
  const newUser = await db.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *', [uuidv4(), email, password]);
  console.log(newUser.rows[0]);
  return newUser.rows[0];
}

module.exports = {
  createUser,
  retrieveUserByEmail,
  retrieveUserById
}