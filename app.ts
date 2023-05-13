import express from "express";
import config from "config";
import connect from "./src/utils/connect";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
  console.log(`app is running on port ${port}`);
  await connect();
});
