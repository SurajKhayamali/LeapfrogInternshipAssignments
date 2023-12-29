import express, { Request, Response } from "express";
import config from "./config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

console.log(`Server listening on port: ${config.serverPort}`);

app.listen(config.serverPort);
