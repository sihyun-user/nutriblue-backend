import express from 'express';

import * as authController from '../controllers/authentication';
import { registerSchema, loginSchema } from '../schemas/authentication';

const authRouter = express.Router();

authRouter.post('/register', registerSchema, authController.register);
authRouter.post('/login', loginSchema, authController.login);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
