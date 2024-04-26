class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor (message: string, statusCode: number, isOperational: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

interface ApiState {
  statusCode: number;
  message: string;
}

export const errHandle = (apiState: ApiState) => {
  const err = new Error(apiState.message);
  if (err instanceof CustomError) {
    err.statusCode = apiState.statusCode;
    err.isOperational = true;
  }
};
