const express = require("express");
const router = express.Router();
const db = require("../db");
const { validationResult } = require("express-validator");
const { validateMessage, handleValidationErrors } = require("../validators");
const jwt = require("jsonwebtoken");

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

// {OK} Visualizzazione informazione dell’utente userId
router.get("/users/:userId", async (req, res) => {
  const mongo = db.getDb();
  const userId = parseInt(req.params.userId); //id come numero e non come stringa
  let user = await mongo.collection("users").findOne({ id: userId });
  delete user.password;
  res.json(user);
});

// {OK} Elenco dei messaggi dell’utente userId
router.get("/messages/:userId", async (req, res) => {
  const mongo = db.getDb();
  const userId = parseInt(req.params.userId); // userId come stringa
  console.log(userId);
  let messages = await mongo
    .collection("messages")
    .find({ userId: userId })
    .toArray();
  res.json(messages);
});

// {OK} Singolo messaggio messageId dell’utente userId
router.get("/messages/:userId/:messageId", async (req, res) => {
  const mongo = db.getDb();
  const userId = parseInt(req.params.userId);
  const messageId = parseInt(req.params.messageId);
  let message = await mongo
    .collection("messages")
    .findOne({ id: messageId, userId: userId });
  res.json(message);
});

// {OK} [Auth] Creazione di un nuovo messaggio
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
    message.date = new Date();
    await mongo.collection("messages").insertOne(message);
    res.json(message);
  }
); // errori, sanitizzazione, data

// [Auth] Aggiunta di un nuovo follow per l’utente userId
router.post("/followers/:userId", requireAuth, async (req, res) => {
  const mongo = db.getDb();
  const follow = {
    followedId: parseInt(req.params.userId),
    followerId: req.userId,
  };
  const existingFollow = await mongo.collection("follows").findOne(follow);
  if (existingFollow !== null) {
    return res.status(409).json({
      success: false,
      errors: ["Already followed"],
    });
  }
  await mongo.collection("follows").insertOne(follow);
  res.json(follow);
}); // manca validazione input

// [Auth] Lista dei followers dell’utente userId
router.get("/followers/:userId", requireAuth, async (req, res) => {
  const mongo = db.getDb();
}); // da fare

// [Auth] Rimozione del follow all’utente userId
router.delete("/followers/:id", requireAuth, async (req, res) => {
  const mongo = db.getDb();
}); // da fare

// [Auth] Elenco dei messaggi degli utenti seguiti
router.get("/feed", requireAuth, async (req, res) => {
  const mongo = db.getDb();
});

// {NO} [Auth] Like ad un messaggio con ID idMessage
// router.post("/like/:messageId", requireAuth, async (req, res) => {
//   const mongo = db.getDb();
//   const like = null;
//   const lastLike = await mongo
//     .collection("likes")
//     .findOne({}, { sort: { id: -1 } });
//   let lastLikeId = lastLike?.id === undefined ? 0 : lastLike.id;
//   lastLikeId++;
//   like.id = lastLikeId;
//   like.messageId = like.userId = res.json(like);
// });

// {NO} [Auth] Rimozione like al messaggio messageId
router.delete("/like/:messageId", requireAuth, async (req, res) => {
  const mongo = db.getDb();
  await mongo.collection("likes").deleteOne({}, { id: messageId });
});

// {OK} Cerca l’utente che matcha la stringa query
router.get("/search", async (req, res) => {
  const mongo = db.getDb();
  const query = req.query.q;
  const users = await mongo
    .collection("users")
    .find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { surname: { $regex: query, $options: "i" } },
      ],
    })
    .toArray();

  res.json(users.map(({ password, ...user }) => user));
  // users.forEach((user) => {
  //   delete user.password;
  // });
  // res.json(users);
});

// {OK} [Auth] Se autenticato, restituisce le informazioni sull’utente
router.get("/whoami", requireAuth, async (req, res) => {
  const mongo = db.getDb();

  const userId = req.userId;
  // console.log(req.userId);
  const user = await mongo.collection("users").findOne({ id: userId });
  delete user.password;
  res.json(user);
});

module.exports = router;
