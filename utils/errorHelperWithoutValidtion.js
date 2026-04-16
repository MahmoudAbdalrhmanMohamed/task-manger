module.exports = async (message, next) => {
  const error = new Error(message);
  error.statusCode = 400;
  return next(error);
};
