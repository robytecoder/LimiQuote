const express = require("express");
const auth = require("./routes/auth");
const social = require("./routes/social");
const other = require("./routes/other");
const cookieParser = require("cookie-parser");

const db = require("./db.js");
const app = express();

app.use(express.static("public"));
app.use(express.json()); //body parsing
app.use(cookieParser());
app.use("/api/auth", auth);
app.use("/api/social", social);
app.use("/api/other", other);

app.listen(3000, async () => {
  console.log("Server avviato");
  await db.connect();
  console.log("Connesso a MongoDB");
});
