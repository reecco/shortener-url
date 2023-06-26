class BaseError extends Error {
  constructor(message = "Internal Server Error", code = 500) {
    super();
    this.message = message;
    this.code = code
  }

  send(res) {
    res.status(this.code).json({ message: this.message, code: this.code });
  }
}

export default BaseError;