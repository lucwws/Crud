const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha",
  database: "crud",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { description } = req.body;
  const { date_create } = req.body;
  const { date_update } = req.body;


  let mysql = "INSERT INTO produtos ( name, cost, description, date_create, date_update) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [name, cost, description, date_create, date_update], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { description } = req.body;
  const { date_create } = req.body;
  const { date_update } = req.body;

  let mysql =
    "SELECT * from produtos WHERE name = ? AND cost = ? AND description = ? AND date_create = ? AND date_update = ?";
  db.query(mysql, [name, cost, description, date_create, date_update], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM produtos";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { description } = req.body;
  const { date_create } = req.body;
  const { date_update } = req.body;

  let mysql = "UPDATE produtos SET name = ?, cost = ?, description = ?, date_create = ?, date_update = ? WHERE id = ?";
  db.query(mysql, [name, cost, description, date_create, date_update, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM produtos WHERE id = ?";
  db.query(mysql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
