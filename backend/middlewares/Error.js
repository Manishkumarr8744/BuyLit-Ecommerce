const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  // Set default statusCode and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle TypeError (invalid resource, e.g., invalid Mongo ID)
  if (err.name === "TypeError" || err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path || "ID"}`;
    err = new ErrorHandler(message, 400);
  }

  // Log the error for debugging
  console.error("Error Middleware:", err);

  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
  });
};
