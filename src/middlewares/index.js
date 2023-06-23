import cors from "cors";
import mongoose from "mongoose";

import BaseError from "../error/BaseError.js";

export function errors(error, req, res, next) {
  if (error instanceof BaseError)
    return error.sendResponse(res);

  if (error instanceof mongoose.Error.CastError)
    return new BaseError("Invalid ID: " + error).sendResponse(res);

  return new BaseError().sendResponse(res);
}

export function access(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    cors();
    next();
  });
}