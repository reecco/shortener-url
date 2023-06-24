import BaseError from "./BaseError.js";

class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized.") {
    super(message, 401);
  }
}

export default UnauthorizedError;