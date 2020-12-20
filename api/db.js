require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb+srv://zhm:5610@cluster0.naan4.gcp.mongodb.net/schools?retryWrites=true&w=majority';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function getDeleteSequence(name) {
  await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: -1 } },
    { returnOriginal: false },
  );
}

function getDb() {
  return db;
}

module.exports = {
  connectToDb,
  getNextSequence,
  getDeleteSequence,
  getDb,
};
