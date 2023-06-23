import express from "express";

import router from "./routes/index.js";
import { environment as env } from "./utils/index.js";
import Database from "./database/index.js";
import { errors } from "./middlewares/index.js";

const app = express();

app.use(
  express.json(),
  router,
  errors
);

app.listen(env.PORT, () => {
  Database.start(env.CONNECTION);
  console.log(`http://localhost:${env.PORT}`);
});
