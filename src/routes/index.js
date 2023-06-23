import { Router } from "express";
import UrlController from "../controllers/index.js";

const router = Router();

router
  .get('/:id', UrlController.access)
  .post("/generate", UrlController.generate);

export default router;