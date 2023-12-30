import express, { Request, Response } from "express";

import config from "./config";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request received!", req.method, req.path);
  next();
});

app.use(routes);

// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     message: "Hello World!",
//   });
// });

console.log(`Server listening on port: ${config.serverPort}`);

app.listen(config.serverPort);
