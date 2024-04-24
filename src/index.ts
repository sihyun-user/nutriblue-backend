import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import connect from './connections';

// import router from './router';

const app = express();

app.use(
  cors({
    credentials: true
  })
);

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', router());

connect();
