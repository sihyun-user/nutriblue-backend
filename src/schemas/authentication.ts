import { z } from 'zod';

import validate from '../middlewares/validate';
import { nameValidator, emailValidator, passwordValidator } from './index';

export const signupSchema = validate(
  z.object({
    name: nameValidator,
    email: emailValidator,
    password: passwordValidator
  })
);

export const loginSchema = validate(
  z.object({
    email: emailValidator,
    password: passwordValidator
  })
);
