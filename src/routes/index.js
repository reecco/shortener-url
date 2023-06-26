import { Router } from "express";

import UrlController from "../controllers/UrlController.js";
import { authorization as auth } from "../middlewares/index.js";

const router = Router();

router
  .get("/list", auth, UrlController.list)
  .get("/:id", UrlController.access)
  .post("/generate", UrlController.generate)
  .delete("/:id", auth, UrlController.remove);

export default router;