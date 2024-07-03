import express from 'express';

import * as bookmarkController from '../controllers/bookmark';
import { isAuthenticated } from '../middlewares';

const foodRouter = express.Router();

foodRouter.use(isAuthenticated);
foodRouter.get('/', bookmarkController.getBookmarksPage);
foodRouter.post('/:foodId', bookmarkController.createBookmark);
foodRouter.delete('/:foodId', bookmarkController.deleteBookmark);

export default (router: express.Router) => {
  router.use('/bookmark', foodRouter);
};
