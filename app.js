const express = require('express');
const morgan = require('morgan');
const errorController = require('./controller/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/userRoute');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const limiter = rateLimit({
  max: 200,
  windowMs: 15 * 60 * 1000,
  message: 'Muitas requests seguidas!',
});

const app = express();

//Global Middlewares
app.use('/api', limiter);
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());

app.enable('trust proxy');
app.use(cookieParser());
/*
app.use(
  cors({
    origin: 'https://mapofme.cloud',
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: 'https://mapofme.cloud',
    credentials: true,
  })
);
*/

app.use(helmet());

app.use((req, res, next) => {
  next();
});

//Resources Routes
app.use('/api/v1/users', userRouter);

//Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Não achamos ${req.originalUrl} nesse server`, 404));
});

app.use(errorController.globalErrorHandler);

module.exports = app;
