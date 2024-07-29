import express from 'express';

import * as sportRecordController from '../controllers/sportRecord';
import { isAuthenticated } from '../middlewares';
import { getSportRecordDateSchema, newSportRecordSchema } from '../schemas/sportRecord';

const recordRouter = express.Router();

recordRouter.post('/date', getSportRecordDateSchema, sportRecordController.getSportRecordByDate);
recordRouter.post('/', newSportRecordSchema, sportRecordController.createSportRecord);
recordRouter.patch(
  '/:sportRecordId',
  newSportRecordSchema,
  sportRecordController.updateSportRecord
);
recordRouter.delete('/:sportRecordId', sportRecordController.deleteSportRecord);

export default (router: express.Router) => {
  router.use('/sportRecord', isAuthenticated, recordRouter);
};
