const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateSignup,
  validateSignin,
  handleValidationErrors,
} = require("../validators");

// POST: Registrazione di un nuovo utente
router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  async (req, res) => {
    try {
      const mongo = db.getDb();
      // controllo unicità username
      const existingUser = await mongo
        .collection("users")
        .findOne({ username: req.body.username });
      if (existingUser !== null) {
        return res.status(409).json({
          success: false,
          errors: ["Username già utilizzata"],
        });
      }
      // hash della password
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      // creazione id numerico
      const lastUser = await mongo
        .collection("users")
        .findOne({}, { sort: { id: -1 } });
      let lastUserId = lastUser?.id === undefined ? 0 : lastUser.id;
      lastUserId++;
      //creazione e inserimento nel db di un nuovo utente
      const user = req.body;
      user.name =
        user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();
      user.surname =
        user.surname.charAt(0).toUpperCase() +
        user.surname.slice(1).toLowerCase();
      user.password = hashPassword;
      user.id = lastUserId;
      await mongo.collection("users").insertOne(user);
      delete user.password;
      return res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Errore interno" });
    }
  }
);

// POST: Login di un utente
router.post(
  "/signin",
  validateSignin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const mongo = db.getDb();
      const { username, password } = req.body;
      // ricerca nel db dell'utente username
      const user = await mongo.collection("users").findOne({ username });
      // login e generazione del jwt token
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
        console.log("Bad credentials");
        res
          .status(401)
          .json({ success: false, errors: ["Username o password errati"] });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Errore interno" });
    }
  }
);

// POST: Logout di un utente
router.post("/signout", async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      success: true,
      msg: "Logout avvenuto con successo",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Errore interno" });
  }
}); // se non è loggato?

module.exports = router;
