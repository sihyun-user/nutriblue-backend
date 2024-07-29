import express from 'express';

import authentication from './authentication';
import user from './user';
import food from './food';
import bookmark from './bookmark';
import record from './record';
import sportRecord from './sportRecord';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  food(router);
  bookmark(router);
  record(router);
  sportRecord(router);

  return router;
};
