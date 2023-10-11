class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode || 500;
    this.message = message || "Something went wrong. Please try again.";
  }
}

module.exports = ErrorHandler;
