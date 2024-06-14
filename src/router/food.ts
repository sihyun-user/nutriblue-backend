import express from 'express';

import * as foodController from '../controllers/food';
import { isAuthenticated } from '../middlewares';
import { createFoodSchema } from '../schemas/food';

const foodRouter = express.Router();

foodRouter.get('/', foodController.getFoodsPage);

// 需要驗證用戶是否登入
foodRouter.use(isAuthenticated);
foodRouter.post('/', createFoodSchema, foodController.createNewFood);

export default (router: express.Router) => {
  router.use('/food', foodRouter)
};
