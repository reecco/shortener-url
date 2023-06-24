import cors from "cors";
import mongoose from "mongoose";

import BaseError from "../error/BaseError.js";
import { environment as env } from "../utils/index.js";
import UnauthorizedError from "../error/UnauthorizedError.js";

export function errors(error, req, res, next) {
  if (error instanceof BaseError)
    return error.sendResponse(res);

  if (error instanceof mongoose.Error.CastError)
    return new BaseError("Invalid ID: " + error).send(res);

  return new BaseError().send(res);
}

export function access(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
    cors();
    next();
  });
}

export function authorization(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  try {
    if (!env.SECRET)
      throw new BaseError("There was an error validating the token.");

    if (token !== env.SECRET)
      throw new UnauthorizedError("Invalid token.");

    next();
  } catch (error) {
    next(error);
  }
}