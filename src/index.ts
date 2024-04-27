import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import connect from './connections';
import router from './router';
import errHandle from './middlewares/error';
import AppError from './helpers/appError';
import errorState from './helpers/errorState';

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl:
        process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL
    })
  })
);

app.use(
  cors({
    credentials: true
  })
);

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router());

app.use('*', (req, res, next) => {
  next(new AppError(errorState.ROUTE_NOT_FOUND));
});

app.use(errHandle);

connect();

const server = http.createServer(app);
server.listen(process.env.PORT);
