// const Router = require('express');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
// const cors = require('cors');

let { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  if (process.env.NODE_ENV !== 'production') {
    SECRET_KEY = 'mySecretKey';
    console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
  } else {
    console.log('Missing env var JWT_SECRET. Authentication disabled');
  }
}

// const routes = new Router();
// routes.use(bodyParser.json());

// const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
// routes.use(cors({ origin, credentials: true }));

function getUser(req) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        return {
          user: {},
          signedIn: false,
        };
      }
    }
    return {
      user: null,
      signedIn: false,
    };
  }
  return {
    user: null,
    signedIn: false,
  };
}

function mustBeSignedIn(resolver) {
  return (root, args, { user }) => {
    if (!user || !user.signedIn) {
      throw new AuthenticationError('You must be signed in');
    }
    return resolver(root, args, { user });
  };
}

function resolveUser(_, args, { user }) {
  return user;
}

module.exports = {
  getUser, mustBeSignedIn, resolveUser,
};
