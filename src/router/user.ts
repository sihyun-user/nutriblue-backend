import express from 'express';

import * as usersController from '../controllers/user';
import validate from '../middlewares/validate';
import { isAuthenticated } from '../middlewares';
import { updateUserSchema, updatePasswordSchema } from '../schemas/users';

const userRouter = express.Router();

userRouter.get('/', usersController.getUser);
userRouter.delete('/', usersController.deleteUser);
userRouter.patch('/', validate(updateUserSchema), usersController.updateUser);
userRouter.patch('/password', validate(updatePasswordSchema), usersController.updateUserPassword);

export default (router: express.Router) => {
  router.use('/user', isAuthenticated, userRouter)
};
