import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor (message: string, statusCode: number, isOperational: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

const handleDevResponse = (err: CustomError, res: Response) => {
  console.log(err.stack);
  res.status(err.statusCode).send({
    status: false,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const errHandle = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // res.status(500).send({
  //   status: false,
  //   message: err.message,
  //   error: err,
  //   stack: err.stack
  // });

  return handleDevResponse(err, res);
};

export default errHandle;
