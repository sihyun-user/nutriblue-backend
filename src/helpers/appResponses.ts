import express from 'express';

interface ApiResponse {
  res: express.Response;
  data: any;
  message: string;
}

interface ApiErrorResponse {
  res: express.Response;
  apiState: {
    statusCode: number;
    message: string;
  };
}

const appSuccess = ({ res, data, message }: ApiResponse) => {
  res.json({
    status: true,
    data,
    message
  });
};

const appError = ({ res, apiState }: ApiErrorResponse) => {
  res.status(apiState.statusCode).json({
    status: false,
    message: apiState.message
  });
};

export { appSuccess, appError };
