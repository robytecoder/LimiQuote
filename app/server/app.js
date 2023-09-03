const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const auth = require("./routes/auth");
const social = require("./routes/social");
const other = require("./routes/other");
const db = require("./db.js");

const app = express();

const PORT = 3000;

app.use(express.static("public"));
app.use(express.json()); //body parsing
app.use(cookieParser());
app.use("/api/auth", auth);
app.use("/api/social", social);
app.use("/api/other", other);

app.use(express.static(path.join(__dirname, "../client/dist")), (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, async () => {
  console.log("Server avviato");
  await db.connect();
  console.log("Connesso a MongoDB");
});
