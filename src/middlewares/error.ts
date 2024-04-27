import { NextFunction, Request, Response } from 'express';

import errorState from '../helpers/errorState';
import AppError from '../helpers/appError';

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message
    });
  } else {
    // log 紀錄
    console.error('出現系統錯誤', err);
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請洽系統管理員'
    });
  }
};

const sendErrorDev = (err: AppError, res: Response) => {
  console.log('err:🚀🚀', err);
  return res.status(err.statusCode).json({
    status: false,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const errHandle = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const isDev = process.env.NODE_ENV === 'development';
  err.statusCode = err.statusCode || 500;

  if (err instanceof SyntaxError) {
    err = new AppError(errorState.SYNTAX_ERROR);
  };
  if (err.name === 'ValidationError') {
    err = new AppError(errorState.DATA_MISSING);
  }
  if (err.name === 'CastError') {
    err = new AppError(errorState.CAST_ERROR);
  };

  isDev ? sendErrorDev(err, res) : sendErrorProd(err, res);
};

export default errHandle;
