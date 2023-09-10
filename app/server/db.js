const { MongoClient } = require("mongodb");
const url = "mongodb://mongohost";
const client = new MongoClient(url);

let _db;

module.exports = {
  connect: async () => {
    await client.connect();
    _db = client.db("social");
  },
  getDb: () => _db, //
};
