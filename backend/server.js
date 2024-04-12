import express from "express";
import usersRouter from "./src/routes/users.js";

const app = express();
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
