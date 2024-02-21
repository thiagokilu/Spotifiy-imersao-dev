const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const path = require("path");
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/api/artist/test", async (req, res) => {
  const response = await fetch(
    "https://api.deezer.com/search?q=" + req.query.test
  );

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});