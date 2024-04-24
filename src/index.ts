import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import logger from 'morgan';

import connect from './connections';
import router from './router';

const app = express();

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

connect();

const server = http.createServer(app);
server.listen(process.env.PORT);
