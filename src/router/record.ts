import express from 'express';

import * as recordController from '../controllers/record';
import { isAuthenticated } from '../middlewares';

const recordRouter = express.Router();

// recordRouter.get('/', recordController.getRecordsPage);
recordRouter.post('/date', recordController.gerRecordsByDate);
recordRouter.post('/', recordController.createRecord);
recordRouter.patch('/:recordId', recordController.updateRecord);
recordRouter.delete('/:recordId', recordController.deleteRecord);

recordRouter.post('/calendar', recordController.getRecordForCalendar);

export default (router: express.Router) => {
  router.use('/record', isAuthenticated, recordRouter);
};
