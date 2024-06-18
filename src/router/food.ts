import express from 'express';

import * as foodController from '../controllers/food';
import { isAuthenticated } from '../middlewares';
import { foodSchema } from '../schemas/food';

const foodRouter = express.Router();

foodRouter.get('/', foodController.getFoodsPage);
foodRouter.get('/:food_id', foodController.getFood);

// 需要驗證用戶是否登入
foodRouter.use(isAuthenticated);
foodRouter.post('/', foodSchema, foodController.createFood);
foodRouter.patch('/:food_id', foodSchema, foodController.updateFood);
foodRouter.delete('/:food_id', foodController.deleteFood);

export default (router: express.Router) => {
  router.use('/food', foodRouter);
};
