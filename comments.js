// Create web server
// Run 'npm install express' first
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.json());

// Set up routes
app.get("/comments", (req, res) => {
  fs.readFile("./comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/comments", (req, res) => {
  fs.readFile("./comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile("./comments.json", JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send("Error writing comments");
        } else {
          res.status(201).send("Comment added");
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Run 'node comments.js' to start the server
