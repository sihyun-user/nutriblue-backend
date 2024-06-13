import express from 'express';

import authentication from './authentication';
import user from './user';
import food from './food';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  food(router);

  return router;
};
