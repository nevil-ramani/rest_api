import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  return await mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("connected to db");
    })
    .catch((error) => {
      logger.error(error);
    });
}

export default connect;
