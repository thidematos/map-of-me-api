process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DB_CONNECTION.replace(
  '<password>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected 🚀🐧'));

const server = app.listen(process.env.PORT, () => {
  console.log('Server started! 🐧');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
