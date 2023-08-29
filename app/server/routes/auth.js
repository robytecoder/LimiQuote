const express = require("express");
const router = express.Router();
const db = require("../db");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateSignup,
  validateSignin,
  handleValidationErrors,
} = require("../validators");

// Registrazione di un nuovo utente
router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  async (req, res) => {
    try {
      const mongo = db.getDb();
      const existingUser = await mongo
        .collection("users")
        .findOne({ username: req.body.username });
      if (existingUser !== null) {
        return res.status(400).json({
          success: false,
          errors: ["Username già utilizzata"],
        });
      }
      console.log({ password: req.body.password });
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const lastUser = await mongo
        .collection("users")
        .findOne({}, { sort: { id: -1 } });
      let lastUserId = lastUser?.id === undefined ? 0 : lastUser.id;
      lastUserId++;
      const user = req.body;
      user.password = hashPassword;
      user.id = lastUserId;
      await mongo.collection("users").insertOne(user);
      delete user.password;
      res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Errore interno" });
    }
  }
); // errori, sanitizzazione

// Login di un utente
router.post(
  "/signin",
  validateSignin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const mongo = db.getDb();
      const user = await mongo.collection("users").findOne({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
        const data = { id: user.id };
        const sessionDuration = 86400;
        const token = jwt.sign(data, "SECRET_HERE", {
          expiresIn: sessionDuration, // 24 ore
        });
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: sessionDuration * 1000,
        });
        res.json({
          success: true,
          msg: "Autenticazione avvenuta con successo",
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "Username o password errati" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Errore interno" });
    }
  }
);

router.post("/signout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      msg: "Logout avvenuto con successo",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Errore interno" });
  }
});

// router.post("/auth/signin", async (req, res) => {
//   const mongo = db.getDb();
//   const user = req.body;
//   await mongo.collection("users")
//   ...
//   res.json(user);
// }); // errori, sanitizzazione, hash(pwd), username unico, express-validator !!!
// ...oppure...
// router.post("/login", async (req, res) => {
//   const mongo = db.getDb();
//   const { username, password } = req.body;
//   const user = await mongo.collection("users").f({ username });
//   if (user?.username === username && user?.password === password) {
//   }
// });

module.exports = router;
