type ErrorState = {
  message: string;
  statusCode: number;
}

class AppError extends Error {
  public errors?: { [key: string]: any };
  statusCode: number;
  isOperational: boolean;

  constructor (errInfo: ErrorState) {
    super(errInfo.message);

    this.statusCode = errInfo.statusCode;
    this.isOperational = true;
  }
}

export default AppError;