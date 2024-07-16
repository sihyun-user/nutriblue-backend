import { NextFunction } from 'express';

type ErrorState = {
  statusCode: number;
  message: string;
};

export class AppError extends Error {
  public errors?: { [key: string]: any };
  statusCode: number;
  isOperational: boolean;

  constructor(errInfo: ErrorState) {
    super(errInfo.message);

    this.statusCode = errInfo.statusCode;
    this.isOperational = true;
  }
}

const appError = (errorState: ErrorState, next: NextFunction) => {
  const error = new AppError(errorState);
  next(error);
};

export default appError;
