import { RequestHandler } from 'express';

import { createFood } from '../modules/food';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const getFood: RequestHandler = async (req, res, next) => {

};

export const createNewFood: RequestHandler = async (req, res) => {
  const { name, subName, brandCompany, unit, unitWeight, nutritions  } = req.body;

  console.log(req.body);

  const data = await createFood({
    name, subName, brandCompany, unit, unitWeight, nutritions
  });

  AppSuccess({ res, data, message: '新增食物成功' });
}