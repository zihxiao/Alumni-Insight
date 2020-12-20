const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence, getDeleteSequence } = require('./db.js');

const PAGE_SIZE = 10;

async function get(_, { id }) {
  const db = getDb();
  const school = await db.collection('schoolsclean').findOne({ id });
  return school;
}

async function list(_, {
  state, zip, rating, search, page, ratingMin, ratingMax,
}) {
  const db = getDb();
  const filter = {};

  if (state) filter.state = state;
  if (zip) filter.zip = zip;
  if (rating) filter.rating = rating;
  if (ratingMin !== undefined || ratingMax !== undefined) {
    filter.rating = {};
    if (ratingMin !== undefined) filter.rating.$gte = ratingMin;
    if (ratingMax !== undefined) filter.rating.$lte = ratingMax;
  }

  if (search) filter.$text = { $search: search, $caseSensitive: false };

  const cursor = await db.collection('schoolsclean').find(filter)
    .sort({ id: 1 })
    .skip(PAGE_SIZE * (page - 1))
    .limit(PAGE_SIZE);

  const totalCount = await cursor.count(false);
  const schools = cursor.toArray();
  const pages = Math.ceil(totalCount / PAGE_SIZE);

  return { schools, pages };
}


async function list2(_, {
  state, zip, rating, search, ratingMin, ratingMax,
}) {
  const db = getDb();
  const filter = {};

  if (state) filter.state = state;
  if (zip) filter.zip = zip;
  if (rating) filter.rating = rating;
  if (ratingMin !== undefined || ratingMax !== undefined) {
    filter.rating = {};
    if (ratingMin !== undefined) filter.rating.$gte = ratingMin;
    if (ratingMax !== undefined) filter.rating.$lte = ratingMax;
  }

  if (search) filter.$text = { $search: search, $caseSensitive: false };

  const cursor = await db.collection('schoolsclean').find(filter);
  const schools = cursor.toArray();
  return { schools };
}


function validate(school) {
  const errors = [];
  if (!school.name) {
    errors.push('Field "name" is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { school }) {
  const db = getDb();
  validate(school);

  const newSchool = Object.assign({}, school);
  newSchool.id = await getNextSequence('schoolsclean');

  const result = await db.collection('schoolsclean').insertOne(newSchool);
  const savedSchool = await db.collection('schoolsclean')
    .findOne({ _id: result.insertedId });
  return savedSchool;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.name || changes.address || changes.state || changes.zip || changes.website) {
    const school = await db.collection('schoolsclean').findOne({ id });
    Object.assign(school, changes);
    validate(school);
  }
  await db.collection('schoolsclean').updateOne({ id }, { $set: changes });
  const savedSchool = await db.collection('schoolsclean').findOne({ id });
  return savedSchool;
}

async function remove(_, { id }) {
  const db = getDb();
  const school = await db.collection('schoolsclean').findOne({ id });
  if (!school) return false;
  let result = await db.collection('deleted_schools').insertOne(school);
  if (result.insertedId) {
    result = await db.collection('schoolsclean').removeOne({ id });
    await getDeleteSequence('schoolsclean');
    return result.deletedCount === 1;
  }
  return false;
}

async function evaluate(_, { id, changes }) {
  const db = getDb();
  await db.collection('schoolsclean').updateOne({ id }, { $push: { comments: changes.comment } });
  const savedSchool = await db.collection('schoolsclean').findOne({ id });
  return savedSchool;
}

module.exports = {
  list,
  list2,
  add,
  get,
  update,
  delete: remove,
  evaluate,
};
