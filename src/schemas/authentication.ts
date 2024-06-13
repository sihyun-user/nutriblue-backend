import { z } from 'zod';

import { nameValidator, emailValidator, passwordValidator } from './index';

export const registerSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator
});

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator
});
