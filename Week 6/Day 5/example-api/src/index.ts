import express from "express";
import fs from "fs/promises";
import path from "path";

const PORT = 3000;
const dataFilePath = path.join(__dirname, "users.json");

const app = express();

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.json({
    success: true,
  });
});

app.get("/users", async (req, res) => {
  const data = await fs.readFile(dataFilePath, {
    encoding: "utf-8",
  });
  const users = JSON.parse(data);
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const data = await fs.readFile(dataFilePath, {
    encoding: "utf-8",
  });
  const users = JSON.parse(data);
  users.push({
    id: users.length + 1,
    name,
    email,
  });

  await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), {
    encoding: "utf-8",
  });

  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
