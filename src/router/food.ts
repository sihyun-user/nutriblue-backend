import express from 'express';

import * as foodController from '../controllers/food';
import { isAuthenticated } from '../middlewares';
import { foodSchema } from '../schemas/food';

const foodRouter = express.Router();

foodRouter.get('/', foodController.getFoodsPage);

// 需要驗證用戶是否登入
foodRouter.use(isAuthenticated);
foodRouter.post('/', foodSchema, foodController.createFood);
foodRouter.patch('/:foodId', foodSchema, foodController.updateFood);
foodRouter.delete('/:foodId', foodController.deleteFood);

foodRouter.get('/bookmark', foodController.getFoodBookmarksPage);
foodRouter.post('/bookmark/:foodId', foodController.createFoodBookmark);
foodRouter.delete('/bookmark/:foodId', foodController.deleteFoodBookmark);

export default (router: express.Router) => {
  router.use('/food', foodRouter);
};
