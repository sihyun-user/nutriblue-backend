import { z } from 'zod';

import validate from '../middlewares/validate';
import {
  requiredString,
  requiredNumber,
  nameValidator,
  passwordValidator,
  numValidator,
  dateValidator
} from './index';

export const updateUserSchema = validate(
  z.object({
    name: nameValidator,
    gender: requiredNumber().refine((value) => [0, 1].includes(value), {
      message: 'gender 只能為 0 或 1'
    }),
    birthday: dateValidator('birthday'),
    height: numValidator('height'),
    weight: numValidator('weight'),
    sportLevel: requiredString().regex(
      /^(underSport|normalSport|moderateSport|severeSport|overSport)$/,
      'sportLevel 格式錯誤'
    ),
    fitnessLevel: requiredString().regex(
      /^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/,
      'fitnessLevel 格式錯誤'
    )
  })
);

export const updatePasswordSchema = validate(
  z
    .object({
      password: passwordValidator(),
      confirmPassword: passwordValidator('確認密碼')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '密碼和確認密碼必須相同',
      path: ['confirmPassword']
    })
);

export const updateAvatarSchema = validate(
  z.object({
    avatar: requiredString()
  })
);
