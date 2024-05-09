import express from 'express';

import * as usersController from '../controllers/users';
import validate from '../middlewares/validate';
import { isAuthenticated } from '../middlewares';
import { updateUserSchema, updatePasswordSchema } from '../schemas/users';

export default (router: express.Router) => {
  router.get('/users/total', isAuthenticated, usersController.getAllUser);
  router.get('/users', isAuthenticated, usersController.getUser);
  router.delete('/users', isAuthenticated, usersController.deleteUser);
  router.patch('/users', isAuthenticated, validate(updateUserSchema), usersController.updateUser);
  router.patch(
    '/users/password',
    isAuthenticated,
    validate(updatePasswordSchema),
    usersController.updateUserPassword
  );
};
