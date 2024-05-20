import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb://localhost:27017';
const dbName = 'tasksDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}
