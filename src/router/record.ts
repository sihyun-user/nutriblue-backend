import express from 'express';

import * as recordController from '../controllers/record';
import { isAuthenticated } from '../middlewares';
import { getRecordDateSchema, createRecordSchema, updateRecordSchema } from '../schemas/record';

const recordRouter = express.Router();

recordRouter.post('/date', getRecordDateSchema, recordController.getRecordsByDate);
recordRouter.post('/', createRecordSchema, recordController.createRecord);
recordRouter.patch('/:recordId', updateRecordSchema, recordController.updateRecord);
recordRouter.delete('/:recordId', recordController.deleteRecord);

export default (router: express.Router) => {
  router.use('/record', isAuthenticated, recordRouter);
};
