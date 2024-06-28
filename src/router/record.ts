import express from 'express';

import * as recordController from '../controllers/record';
import { isAuthenticated } from '../middlewares';

const recordRouter = express.Router();

recordRouter.get('/', recordController.getRecordsPage);
recordRouter.post('/:foodId', recordController.createRecord);
recordRouter.patch('/:recordId', recordController.updateRecord);
recordRouter.delete('/:recordId', recordController.deleteRecord);

export default (router: express.Router) => {
  router.use('/record', isAuthenticated, recordRouter);
};
