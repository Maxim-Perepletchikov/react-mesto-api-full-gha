const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
// const cors = require('./middlewares/cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(express.json());
// app.use(cookieParser());
app.use(helmet());
// app.use(cors);
app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
}));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${PORT}`);
});
