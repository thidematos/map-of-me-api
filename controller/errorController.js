const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Algo deu muito errado :(',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Entrada invalida: ${err.path}: ${err.value} não existe!`;
  return new AppError(message, 400);
};

const handleDuplicateDB = (err) => {
  const message = `Há um campo duplicado: ${Object.keys(err.keyValue).join(
    ', '
  )}. Por favor, use outro valor!`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const error = Object.values(err.errors)
    .map((errorEl) => errorEl.message)
    .join('. ');
  const message = `Falha na validação dos dados: ${error}`;
  return new AppError(message, 400);
};

const handleInvalidJWT = (err) =>
  new AppError(
    'Autorização não realizada. Por favor, faça login novamente!',
    401
  );

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateDB(err);
    if (err.name === 'ValidationError') error = handleValidationDB(err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
      error = handleInvalidJWT(err);
    sendErrorProd(error, res);
  }
};
