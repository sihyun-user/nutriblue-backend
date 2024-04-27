import { Response } from 'express';

type SuccessState = {
  res: Response,
  data?: any,
  message: string,
  status?: boolean
}

const AppSuccess = (susccessInfo: SuccessState) => {
  const { res, data, message, status = true } = susccessInfo;
  res.json({
    status,
    data,
    message
  });
};

export default AppSuccess;
