import express from 'express';

import * as authController from '../controllers/authentication';
import { signupSchema, loginSchema } from '../schemas/authentication';

const authRouter = express.Router();

authRouter.post('/signup', signupSchema, authController.signup);
authRouter.post('/login', loginSchema, authController.login);
authRouter.post('/refreshToken', authController.refreshToken);
authRouter.get('/health', authController.health);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
