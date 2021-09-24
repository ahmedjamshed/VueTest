const express = require("express");
const cors = require("cors");
const path = require("path");
const api = require("./api");
app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist"));
});

const port = process.env.PORT || 80;
app.listen(port);
