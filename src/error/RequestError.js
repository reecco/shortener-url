import BaseError from "./BaseError.js";

class RequestError extends BaseError {
  constructor(message = "Invalid request.") {
    super(message, 400);
  }
}

export default RequestError;