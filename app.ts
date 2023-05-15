import express ,{ Request, Response, NextFunction} from "express";
import config from "config";
import connect from "./src/utils/connect";
import logger from "./src/utils/logger";
const { z } = require("zod");

const port = config.get<number>("port");

const app = express();



const LoginSchema = z.object({
    // In this example we will only validate the request body.
    body: z.object({
      // email should be valid and non-empty
      email: z.string().email(),
      // password should be at least 6 characters
      password: z.string().min(6),
    }),
  });
  
  const validate = (schema: any) => (req: Request, res:Response, next:NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      next();
    } catch (err) {
      return res.status(400).send(err);
    }
  };


app.listen(port, async () => {
    // console.log(`app is running on port ${port}`);
    logger.info(`app is running on port ${port}`);
    await connect();
});





