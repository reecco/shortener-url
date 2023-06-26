import express from "express";

import router from "./routes/index.js";
import { environment as env } from "./utils/index.js";
import Database from "./database/index.js";
import { errors } from "./middlewares/index.js";

const app = express();

app.use(
  "/api/v1",
  express.json(),
  router,
  errors
);

app.listen(env.PORT, () => {
  console.log(new Date().toLocaleTimeString());
  Database.start(env.CONNECTION);
  console.log(`http://localhost:${env.PORT}`);
});
