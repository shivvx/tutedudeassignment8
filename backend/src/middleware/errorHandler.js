// Express error handler middleware
// It catches errors thrown inside async routes when next(error) is called

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode
  if (statusCode === 200) {
    // If status is 200, it means it wasn't set, so default to 500
    statusCode = 500
  }

  // Handle mongoose schema validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ message: messages.join(', ') })
  }

  // General error response
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // Hide stack trace in production for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export default errorHandler
