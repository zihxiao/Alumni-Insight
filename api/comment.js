const { CommentInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
  const db = getDb();
  const comment = await db.collection('comments').findOne({ id });
  return comment;
}


// async function list(_, { status }) {
//   const db = getDb();
//   const filter = {};
//   if (status) filter.status = status;
//   const issues = await db.collection('issues').find(filter).toArray(); return issues;
// }

async function list(_, { schoolID, userID }) {
  const db = getDb();
  const filter = {};

  if (schoolID) filter.schoolID = schoolID;
  if (userID) filter.userID = userID;
  const comments = await db.collection('comments').find(filter).toArray();
  return comments;
}

async function add(_, { comment }) {
  const db = getDb();

  const newComment = Object.assign({}, comment);
  newComment.id = await getNextSequence('comments');

  const result = await db.collection('comments').insertOne(newComment);
  const savedComment = await db.collection('comments')
    .findOne({ _id: result.insertedId });
  return savedComment;
}

function validate(comment) {
  const errors = [];
  if (!comment.rating) {
    errors.push('Field "rating" is required');
  }
  if (errors.length > 0) {
    throw new CommentInputError('Invalid input(s)', { errors });
  }
}

async function update(_, { id, changes1 }) {
  const db = getDb();
  if (changes1.rating || changes1.content) {
    const comment = await db.collection('comments').findOne({ id });
    Object.assign(comment, changes1);
    validate(comment);
  }
  await db.collection('comments').updateOne({ id }, { $set: changes1 });
  const savedComment = await db.collection('comments').findOne({ id });
  return savedComment;
}

module.exports = {
  get,
  list,
  add,
  update,
};
