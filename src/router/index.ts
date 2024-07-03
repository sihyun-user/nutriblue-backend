import express from 'express';

import authentication from './authentication';
import user from './user';
import food from './food';
import record from './record';
import bookmark from './bookmark';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  food(router);
  record(router);
  bookmark(router);

  return router;
};
