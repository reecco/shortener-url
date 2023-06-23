class BaseError extends Error {
  // code;

  constructor(message = "Internal Server Error", code) {
    super();
    this.message = message;
    this.code = code
  }

  sendResponse(res) {
    res.status(this.code).json({ message: this.message, code: this.code });
  }
}

export default BaseError;