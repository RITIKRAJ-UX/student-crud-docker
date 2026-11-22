const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static("public"));


// ======================
// CREATE STUDENT
// ======================

app.post("/students", (req, res) => {

  const { name, age, course } = req.body;

  db.run(
    "INSERT INTO students (name, age, course) VALUES (?, ?, ?)",
    [name, age, course],

    function (err) {

      if (err) {

        return res.status(500).send(err.message);

      }

      res.send({

        id: this.lastID,

        message: "Student added successfully"

      });

    }

  );

});



// ======================
// GET ALL STUDENTS
// ======================

app.get("/students", (req, res) => {

  db.all(

    "SELECT * FROM students",

    [],

    (err, rows) => {

      if (err) {

        return res.status(500).send(err.message);

      }

      res.send(rows);

    }

  );

});



// ======================
// GET SINGLE STUDENT
// ======================

app.get("/students/:id", (req, res) => {

  db.get(

    "SELECT * FROM students WHERE id=?",

    [req.params.id],

    (err, row) => {

      if (err) {

        return res.status(500).send(err.message);

      }

      res.send(row);

    }

  );

});



// ======================
// UPDATE STUDENT
// ======================

app.put("/students/:id", (req, res) => {

  const { name, age, course } = req.body;

  db.run(

    "UPDATE students SET name=?, age=?, course=? WHERE id=?",

    [name, age, course, req.params.id],

    function (err) {

      if (err) {

        return res.status(500).send(err.message);

      }

      res.send({

        message: "Student updated successfully"

      });

    }

  );

});



// ======================
// DELETE STUDENT
// ======================

app.delete("/students/:id", (req, res) => {

  db.run(

    "DELETE FROM students WHERE id=?",

    [req.params.id],

    function (err) {

      if (err) {

        return res.status(500).send(err.message);

      }

      res.send({

        message: "Student deleted successfully"

      });

    }

  );

});



// ======================
// HOME PAGE
// ======================

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/public/index.html");

});



// ======================
// START SERVER
// ======================

app.listen(3000, () => {

  console.log("Server running on http://localhost:3000");

});