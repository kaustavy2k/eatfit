const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const cors = require("cors");
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/", routes);
app.use(express.static(__dirname + "/client/build"));
const path = require("path");
app.get("*", (req, res) => {
  res.status(200).sendFile("index.html", { root: __dirname });
});
module.exports = app;
