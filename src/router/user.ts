import express from 'express';

import usersController from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, usersController.getAllUser);
  router.get('/users/:id', isAuthenticated, usersController.getUser);
  router.delete('/users/:id', isAuthenticated, isOwner, usersController.deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, usersController.updateUser);
};
