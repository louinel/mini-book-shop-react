const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "v!7VZl7gms!m9J3",
  database: "lama_mini",
});

// Definig routes
app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  })
})

app.get("/book/:id", (req, res) => {

  const userId = req.params.id;
  const q = `SELECT * FROM books WHERE id = ${userId}`;

  db.query(q, (err, data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  })
})

app.post("/book", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  })
})

app.put('/book/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if(err) {
      return res.send(err);
    }
    return res.json(data);
  });
});

app.delete('/book/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  })
})

// Starting the server
app.listen(5000, () => {
  console.log("Backend connected !");
});
