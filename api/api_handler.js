const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const school = require('./school.js');
const users = require('./users.js');
const comment = require('./comment.js');
const auth = require('./auth.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    schoolList2: school.list2,
    schoolList: school.list,
    school: school.get,
    user: auth.resolveUser,
    user1: users.get,
    comment: comment.get,
    users: users.list,
    comments: comment.list,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    schoolAdd: school.add,
    schoolUpdate: school.update,
    schoolDelete: school.delete,
    register: users.register,
    login: users.login,
    commentAdd: comment.add,
    commentUpdate: comment.update,
    userUpdate: users.update,
  },
  GraphQLDate,
};

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  playground: true,
  introspection: true,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  let cors;
  if (enableCors) {
    const origin = process.env.API_END_POINT || 'http://localhost:8080';
    const methods = 'POST';
    cors = { origin, methods, credentials: true };
  } else {
    cors = 'false';
  }
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
