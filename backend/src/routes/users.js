import mysql from "mysql2";
import express from "express";

const router = express.Router();

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A@3<>zxc",
  database: "design-marketplace",
});

router.get("/", (req, res) => {
  databaseConnection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send("Error fetching users");
      return;
    }
    res.status(200).json(results);
  });
});

router.post("/usernameValidity", (req, res) => {
  const { username } = req?.body;

  databaseConnection.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (error, results) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      if (results.length > 0) {
        res.status(409).send("Username already taken");
        return;
      }
    }
  );
});

router.post("/emailValidity", (req, res) => {
  const { email } = req?.body;

  databaseConnection.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      if (results.length > 0) {
        res.status(201).send("Email already taken");
        return;
      } else {
        res.status(200).send("Email available");
        return;
      }
    }
  );
});

router.post("/createUser", (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  if (!username || !firstName || !lastName || !email || !password) {
    res.status(400).send("Missing required fields");
    return;
  }

  databaseConnection.query(
    `INSERT INTO users (username, first_name, last_name, email, password) VALUES ('${username}', '${firstName}', '${lastName}', '${email}', '${password}')`,
    (error, results) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(201).send(results);
      return;
    }
  );
});

export default router;
