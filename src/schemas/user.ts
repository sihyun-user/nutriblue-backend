import { z } from 'zod';

import validate from '../middlewares/validate';
import { required, nameValidator, passwordValidator, strNumValidator } from './index';

export const updateUserSchema = validate(z.object({
  name: nameValidator,
  gender: z.string({ required_error: required('性別') }).regex(/^[01]$/, '性別只能為 0 或 1'),
  birthday: z
    .string({ required_error: required('生日') })
    .regex(/^(\d{4})-(\d{2})-(\d{2})$/, '生日格式錯誤，請輸入 YYYY-MM-DD 格式'),
  height: strNumValidator('身高', 0),
  weight: strNumValidator('體重', 0),
  sportLevel: z
    .string({ required_error: required('運動量') })
    .regex(/^(underSport|normalSport|moderateSport|severeSport|overSport)$/, '運動量格式錯誤'),
  fitnessLevel: z
    .string({ required_error: required('健身目標') })
    .regex(/^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/, '健身目標格式錯誤'),
  bio: z.string({ required_error: required('自我介紹') }).max(100, '自我介紹長度需小於 100 個字元')
}));

export const updatePasswordSchema = validate(z.object({
  password: passwordValidator
}));
