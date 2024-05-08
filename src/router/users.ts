import express from 'express';

import * as usersController from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users/total', isAuthenticated, usersController.getAllUser);
  router.get('/users', isAuthenticated, usersController.getUser);
  router.delete('/users', isAuthenticated, usersController.deleteUser);
  router.patch('/users', isAuthenticated, usersController.updateUser);
};
