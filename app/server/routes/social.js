const express = require("express");
const router = express.Router();
const db = require("../db");
const { validationResult } = require("express-validator");
const { validateMessage, handleValidationErrors } = require("../validators");
const jwt = require("jsonwebtoken");

// Middleware per il controllo dell'autorizzazione
const requireAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ success: false, errors: ["Unauthenticated"] });
  try {
    const decoded = jwt.verify(token, "SECRET_HERE");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, errors: ["Token not valid"] });
  }
};

// GET: Visualizzazione informazione dell’utente userId
router.get("/users/:userId", async (req, res) => {
  try {
    const mongo = db.getDb();
    const userId = parseInt(req.params.userId);
    const user = await mongo.collection("users").findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ success: false, errors: ["Bad request"] });
    }
    delete user.password;
    return res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET: Elenco dei messaggi dell’utente userId
router.get("/messages/:userId", async (req, res) => {
  try {
    const mongo = db.getDb();
    const userId = parseInt(req.params.userId);
    const messages = await mongo
      .collection("messages")
      .find({ userId: userId })
      .toArray();
    if (messages) {
      res.json({ success: true, data: messages });
    } else {
      res.status(404).json({ success: false, errors: ["Bad request"] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET: Singolo messaggio messageId dell’utente userId
router.get("/messages/:userId/:messageId", async (req, res) => {
  try {
    const mongo = db.getDb();
    const userId = parseInt(req.params.userId);
    const messageId = parseInt(req.params.messageId);
    const message = await mongo
      .collection("messages")
      .findOne({ id: messageId, userId: userId });
    if (message) {
      res.json({ success: true, data: message });
    } else {
      res.status(404).json({ success: false, errors: ["Bad request"] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// POST[Auth]: Creazione di un nuovo messaggio
router.post(
  "/messages",
  requireAuth,
  validateMessage,
  handleValidationErrors,
  async (req, res) => {
    try {
      const mongo = db.getDb();
      const message = req.body;
      const lastMessage = await mongo
        .collection("messages")
        .findOne({}, { sort: { id: -1 } });
      let lastMessageId = lastMessage?.id === undefined ? 0 : lastMessage.id;
      lastMessageId++;
      message.id = lastMessageId;
      message.userId = req.userId; // !!!
      message.date = new Date();
      await mongo.collection("messages").insertOne(message);
      return res.json({ success: true, data: message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Errore interno" });
    }
  }
);

// POST[Auth]: Aggiunta di un nuovo follow per l’utente userId
router.post("/followers/:userId", requireAuth, async (req, res) => {
  try {
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
    const existingUser = await mongo
      .collection("users")
      .findOne({ id: follow.followedId });
    if (!existingUser) {
      return res.status(404).json({ success: false, errors: ["Bad request"] });
    }
    await mongo.collection("follows").insertOne(follow);
    return res.json({ success: true, data: follow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET[Auth]: Lista dei followers dell’utente userId
router.get("/followers/:userId", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const followedId = parseInt(req.params.userId);
    const follows = await mongo
      .collection("follows")
      .find({ followedId })
      .toArray();
    const followersIds = follows.map((follow) => follow.followerId);
    const followers = await mongo
      .collection("users")
      .find({ id: { $in: followersIds } });
    return res.json(followers.map(({ password, ...user }) => user));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// DELETE[Auth]: Rimozione del follow all’utente userId
router.delete("/followers/:userId", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const follow = {
      followedId: parseInt(req.params.userId),
      followerId: req.userId,
    };
    const existingFollow = await mongo.collection("follows").findOne(follow);
    if (!existingFollow) {
      const existingUser = await mongo
        .collection("users")
        .findOne({ id: follow.followedId });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          errors: ["Already not followed"],
        });
      }
      return res.status(404).json({ success: false, errors: ["Bad request"] });
    }
    await mongo.collection("follows").deleteOne(follow);
    return res.json({ success: true, data: follow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET[Auth]: Elenco dei messaggi degli utenti seguiti
router.get("/feed", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const userId = req.userId;
    const followedIds = await mongo
      .collection("follows")
      .distinct("followedId", { followerId: userId });
    const feed = await mongo
      .collection("messages")
      .find({ userId: { $in: followedIds } }, { sort: { id: -1 } })
      .toArray();
    return res.json({ success: true, data: feed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// POST[Auth]: Like ad un messaggio con ID idMessage
router.post("/like/:messageId", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const like = {
      messageId: parseInt(req.params.messageId),
      userId: req.userId,
    };
    const existingLike = await mongo.collection("likes").findOne(like);
    if (existingLike) {
      return res.status(409).json({
        success: false,
        errors: ["Already liked"],
      });
    }
    const existingMessage = await mongo
      .collection("messages")
      .findOne({ id: like.messageId });
    if (!existingMessage) {
      return res.status(404).json({ success: false, errors: ["Bad request"] });
    }
    await mongo.collection("likes").insertOne(like);
    return res.json({ success: true, data: like });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// DELETE[Auth]: Rimozione like al messaggio messageId
router.delete("/like/:messageId", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const like = {
      messageId: parseInt(req.params.messageId),
      userId: req.userId,
    };
    const existingLike = await mongo.collection("likes").findOne(like);
    if (!existingLike) {
      const existingMessage = await mongo
        .collection("messages")
        .findOne({ id: like.messageId });
      if (existingMessage) {
        return res.status(409).json({
          success: false,
          errors: ["Already not liked"],
        });
      }
      return res.status(404).json({ success: false, errors: ["Bad request"] });
    }
    await mongo.collection("likes").deleteOne(like);
    return res.json({ success: true, data: like });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET: Cerca l’utente che matcha la stringa query
router.get("/search", async (req, res) => {
  try {
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
    return res.json(users.map(({ password, ...user }) => user));
    // users.forEach((user) => {
    //   delete user.password;
    // });
    // res.json(users);
  } catch {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// GET[Auth]: Se autenticato, restituisce le informazioni sull’utente
router.get("/whoami", requireAuth, async (req, res) => {
  try {
    const mongo = db.getDb();
    const userId = req.userId;
    const user = await mongo.collection("users").findOne({ id: userId });
    delete user.password;
    return res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

module.exports = router;
