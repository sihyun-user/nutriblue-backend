import { z } from 'zod';

import { nameValidator, usernameValidator, emailValidator, passwordValidator } from './index';

export const registerSchema = z.object({
  name: nameValidator,
  username: usernameValidator,
  email: emailValidator,
  password: passwordValidator
});

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator
});
