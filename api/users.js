const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

let { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  if (process.env.NODE_ENV !== 'production') {
    SECRET_KEY = 'mySecretKey';
    console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
  } else {
    console.log('Missing env var JWT_SECRET. Authentication disabled');
  }
}

function validateRegister(registerInputs) {
  const errors = [];
  const {
    username, email, password, confirmPassword,
  } = registerInputs;
  if (username.trim() === '') {
    errors.push('Username must not be empty');
  }
  if (email.trim() === '') {
    errors.push('Email must not be empty');
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.push('Email must be a valid email address');
    }
  }
  if (password === '') {
    errors.push('Password must not empty');
  } else if (password !== confirmPassword) {
    errors.push('Passwords must match');
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      school: user.school,
      schoolID: user.schoolID,
    },
    SECRET_KEY,
    { expiresIn: '10h' },
  );
}

async function register(_, { registerInputs }) {
  const db = getDb();
  const { errors, valid } = validateRegister(registerInputs);
  if (!valid) {
    throw new UserInputError('Errors:', { errors });
  }
  const { username } = registerInputs;
  const user = await db.collection('users').findOne({ username });
  if (user) {
    throw new UserInputError('Username is taken', {
      errors: {
        username: 'This username is taken',
      },
    });
  }
  const bcryptPassword = await bcrypt.hash(registerInputs.password, 12);
  const newUser = Object.assign({}, registerInputs);
  const token = generateToken(newUser);
  newUser.password = bcryptPassword;
  newUser.token = token;
  newUser.id = await getNextSequence('users');
  delete newUser.confirmPassword;

  const result = await db.collection('users').insertOne(newUser);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  return savedUser;
}

function validateLoginInput(username, password) {
  const errors = [];
  if (username.trim() === '') {
    errors.push('Username must not be empty');
  }
  if (password.trim() === '') {
    errors.push('Password must not be empty');
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

function validate(user) {
  const errors = [];
  if (!user.username) {
    errors.push('Field "username" is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function login(_, { username, password }) {
  const db = getDb();
  const { errors, valid } = validateLoginInput(username, password);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }
  const user = await db.collection('users').findOne({ username });
  const { id } = user;
  if (!user) {
    errors.push('Field "username" is required');
    throw new UserInputError('User not found', { errors });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.push('User not found');
    throw new UserInputError('Wrong crendetials', { errors });
  }

  const token = generateToken(user);
  await db.collection('users').updateOne({ id }, { $set: { token } });
  const returnUser = await db.collection('users').findOne({ id });
  return returnUser;
}

async function get(_, { id }) {
  const db = getDb();
  const user = await db.collection('users').findOne({ id });
  return user;
}

async function list(_, { schoolID }) {
  const db = getDb();
  const filter = {};

  if (schoolID) filter.schoolID = schoolID;
  const users = await db.collection('users').find(filter).toArray();
  return users;
}

async function add(_, { user }) {
  const db = getDb();

  const newUser = Object.assign({}, user);
  newUser.id = await getNextSequence('users');

  const result = await db.collection('users').insertOne(newUser);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  return savedUser;
}

async function update(_, { id, changes2 }) {
  const db = getDb();
  if (changes2.address || changes2.zip || changes2.city || changes2.password
    || changes2.username || changes2.university || changes2.token) {
    const user = await db.collection('users').findOne({ id });
    Object.assign(user, changes2);
    validate(user);
  }
  await db.collection('users').updateOne({ id }, { $set: changes2 });
  const savedUser = await db.collection('users').findOne({ id });
  return savedUser;
}

module.exports = {
  update,
  add,
  get,
  login,
  register,
  list,
};
