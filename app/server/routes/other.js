const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Ausiliari
// Elenco users
router.get("/users", async (req, res) => {
  const mongo = db.getDb();
  let users = await mongo.collection("users").find().toArray();
  // let users = await mongo.collection("users").find();
  // await users.array.array.forEach(e => {
  // restituisco solo ciò che voglio riempiendo un altro array con i dati che voglio restituire
  // });
  res.json(users);
});
// Elenco messages
router.get("/messages", async (req, res) => {
  const mongo = db.getDb();
  let messages = await mongo.collection("messages").find().toArray();
  // let users = await mongo.collection("users").find();
  // await users.array.array.forEach(e => {
  // restituisco solo ciò che voglio riempiendo un altro array con i dati che voglio restituire
  // });
  res.json(messages);
});
// Cancella user
router.delete("/users/:userId", async (req, res) => {
  const mongo = db.getDb();
  const userId = parseInt(req.params.userId);
  let user = await mongo.collection("users").findOne({ id: req.params.id });
  await mongo.collection("users").deleteOne({ id: userId });
  res.json();
});
// Cancella message
router.delete("/messages/:messageId", async (req, res) => {
  const mongo = db.getDb();
  const messageId = parseInt(req.params.messageId);
  let message = await mongo
    .collection("messages")
    .findOne({ id: req.params.messageId });
  await mongo.collection("messages").deleteOne({ id: messageId });
  res.json();
});

// router.get("/hello", query("person").notEmpty().escape(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     return res.send(`Hello, ${req.query.person}!`);
//   }

//   res.send({ errors: result.array() });
// });

module.exports = router;
