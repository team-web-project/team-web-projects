import express from "express";
import open from "open";
import path from "path";
import { fileURLToPath } from "url"; // 追加

const __filename = fileURLToPath(import.meta.url); // 追加
const __dirname = path.dirname(__filename); // 追加

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);

app.get("/", (req, res) => {
  res.render("top");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  open("http://localhost:3000/");
});
