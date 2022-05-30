export const handleErrorAsync = function handleErrorAsync(func) {
  return function (req, res, next) {
    func(req, res, next).catch(function (error) {
      return next(error);
    });
  };
};

export const CustomError = (httpStatus, errMessage, next) => {
  const error = new Error(errMessage);
  error.statusCode = httpStatus;
  error.isOperational = true;
  next(error);
};
