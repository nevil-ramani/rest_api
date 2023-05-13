import mongoose from "mongoose";
import config from "config";



async function connect() {
  const dbUri = config.get<string>("dbUri");

  return await mongoose
    .connect(dbUri)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(error);
    });

}

export default connect;
