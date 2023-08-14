/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes');
const cors = require('./middlwares/cors');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const { DB_URL } = require('./utils/config');


const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.listen(PORT);
