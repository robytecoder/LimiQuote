const express = require("express");
const router = express.Router();
const db = require("../db");
const { validationResult } = require("express-validator");
const { validateMessage, handleValidationErrors } = require("../validators");
const jwt = require("jsonwebtoken");

// Visualizzazione informazione dell’utente userId
router.get("/users/:userId", async (req, res) => {
  const mongo = db.getDb();
  const userId = parseInt(req.params.userId); //id come numero e non come stringa
  let user = await mongo.collection("users").findOne({ userId: userId });
  res.json(user);
}); // errori, autocompletamento, ..?

// Elenco dei messaggi dell’utente userId
router.get("/messages/:userId", async (req, res) => {
  const mongo = db.getDb();
  const userId = req.params.userId; // userId come stringa
  let messages = await mongo
    .collection("messages")
    .find({ userId: userId })
    .toArray();
  // messages = JSON.stringify(messages);
  console.log(messages);
  res.json(messages);
}); // find({userId: {$all: [userId]}}) ?

// Singolo messaggio messageId dell’utente userId
// router.get("/messages/:userId/:messageId", async (req, res) => {
//   const mongo = db.getDb();
//   const userId = req.params.userId;
//   const messageId = parseInt(req.params.messageId);
//   let message = await mongo
//     .collection("messages")
//     .findOne({ $and: [{ messageId: messageId }, { userId: userId }] });
//   res.json(message);
// }); // da fare

const requireAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ errors: "Unauthenticated" });
  try {
    const decoded = jwt.verify(token, "SECRET_HERE");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ errors: "Token not valid" });
  }
};

// [Auth] Creazione di un nuovo messaggio
router.post(
  "/messages",
  requireAuth,
  validateMessage,
  handleValidationErrors,
  async (req, res) => {
    const mongo = db.getDb();
    const message = req.body;
    // message.date =
    const lastMessage = await mongo
      .collection("messages")
      .findOne({}, { sort: { id: -1 } });
    let lastMessageId = lastMessage?.id === undefined ? 0 : lastMessage.id;
    lastMessageId++;
    message.id = lastMessageId;
    message.userId = req.userId;
    await mongo.collection("messages").insertOne(message);
    res.json(message);
  }
); // errori, sanitizzazione, data

// [Auth] Lista dei followers dell’utente userId
router.get("/followers/:userId", requireAuth, async (req, res) => {
  const mongo = db.getDb();
}); // da fare

// [Auth] Aggiunta di un nuovo follow per l’utente userId
router.post("/followers/:userId", requireAuth, async (req, res) => {
  const mongo = db.getDb();
}); // da fare

// [Auth] Rimozione del follow all’utente userId
router.delete("/followers/:id", requireAuth, async (req, res) => {
  const mongo = db.getDb();
}); // da fare

// [Auth] Elenco dei messaggi degli utenti seguiti
router.get("/feed", async (req, res) => {
  const mongo = db.getDb();
});

// [Auth] Like ad un messaggio con ID idMessage
router.post("/like/:messageId", async (req, res) => {
  const mongo = db.getDb();
});

// [Auth] Rimozione like al messaggio messageId
router.delete("/like/:messageId", async (req, res) => {
  const mongo = db.getDb();
});

// Cerca l’utente che matcha la stringa query
router.get("/search?q=query", async (req, res) => {
  const mongo = db.getDb();
});

// [Auth] Se autenticato, restituisce le informazioni sull’utente
router.get("/whoami", async (req, res) => {
  const mongo = db.getDb();
});

module.exports = router;
