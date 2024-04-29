import express from 'express';

import * as authController from '../controllers/authentication';
import { validate } from '../middlewares/validation';
import { registerSchema, loginSchema } from '../schemas/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', validate(registerSchema), authController.register);
  router.post('/auth/login', validate(loginSchema), authController.login);
  router.get('/auth/logout', authController.logout);
};
