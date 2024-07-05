import express from 'express';

import * as foodController from '../controllers/food';
import { isAuthenticated } from '../middlewares';
import { foodSchema } from '../schemas/food';

const foodRouter = express.Router();

foodRouter.get('/guest', foodController.getFoodsPage);

// 需要驗證用戶是否登入
foodRouter.use(isAuthenticated);
foodRouter.get('/', foodController.getUserFoodsPage);
foodRouter.post('/', foodSchema, foodController.createFood);
foodRouter.patch('/:foodId', foodSchema, foodController.updateFood);
foodRouter.delete('/:foodId', foodController.deleteFood);

export default (router: express.Router) => {
  router.use('/food', foodRouter);
};
