import express from 'express';

import * as authController from '../controllers/authentication';
import validate from '../middlewares/validate';
import { registerSchema, loginSchema } from '../schemas/authentication';

const authRouter = express.Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
