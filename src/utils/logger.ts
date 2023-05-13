import dayjs from "dayjs";
import { pino } from "pino";

const log = pino({
  transport: {
    target: "pino-pretty",
  },
  timeStamp: () => `"time":"${dayjs().format()}"`,
});

export default log;
