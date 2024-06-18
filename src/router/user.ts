import express from 'express';

import * as userController from '../controllers/user';
import { isAuthenticated } from '../middlewares';
import { updateUserSchema, updatePasswordSchema } from '../schemas/user';

const userRouter = express.Router();

userRouter.get('/', userController.getUser);
userRouter.delete('/', userController.deleteUser);
userRouter.patch('/', updateUserSchema, userController.updateUser);
userRouter.patch('/password', updatePasswordSchema, userController.updateUserPassword);

export default (router: express.Router) => {
  router.use('/user', isAuthenticated, userRouter);
};
