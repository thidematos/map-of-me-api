const express = require('express');
const morgan = require('morgan');
const errorController = require('./controller/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');

const app = express();

const userRouter = require('./routes/userRoute');

//Global Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: 'https://thidematos.github.io/game-map-of-me' }));
app.options('*', cors());

//Resources Routes
app.use('/api/v1/users', userRouter);

//Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Não achamos ${req.originalUrl} nesse server`, 404));
});

app.use(errorController.globalErrorHandler);

module.exports = app;
