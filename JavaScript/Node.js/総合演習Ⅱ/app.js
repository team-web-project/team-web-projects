import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "reservation_app",
});
connection.connect();

app.get("/", (req, res) => {
  connection.query("SELECT * FROM reservations", (error, results) => {
    if (error) throw error;

    // 日付・時刻を整形
    const formattedResults = results.map((item) => {
      const date = new Date(item.date);
      const pad = (n) => n.toString().padStart(2, "0");

      return {
        ...item,
        formattedDate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )}`, // For input[type="date"]
        formattedTime: item.time ? item.time.slice(0, 5) : "", // For input[type="time"]
      };
    });

    res.render("index.ejs", { items: formattedResults });
  });
});

app.get("/reservation", (req, res) => {
  res.render("reservation.ejs");
});

app.post("/reserve", (req, res) => {
  const { name, date, time, message } = req.body;
  const sql =
    "INSERT INTO reservations (name, date, time, message) VALUES (?, ?, ?, ?)";
  connection.query(sql, [name, date, time, message], (err) => {
    if (err) throw err;
    // 保存後に一覧画面にリダイレクト
    res.redirect("/");
  });
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM reservations WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.redirect("/");
    }
  );
});

app.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM reservations WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.render("edit.ejs", { item: results[0] });
    }
  );
});

app.post("/update/:id", (req, res) => {
  const { name, date, time, message } = req.body;
  connection.query(
    "UPDATE reservations SET name = ?, date = ?, time = ?, message = ? WHERE id = ?",
    [name, date, time, message, req.params.id],
    (error, results) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
