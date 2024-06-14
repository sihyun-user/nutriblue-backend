import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, nameValidator, passwordValidator, strNumValidator } from './index';

export const updateUserSchema = validate(z.object({
  name: nameValidator,
  gender: requiredString().regex(/^[01]$/, '性別只能為 0 或 1'),
  birthday: requiredString().regex(/^(\d{4})-(\d{2})-(\d{2})$/, '生日格式錯誤，請輸入 YYYY-MM-DD 格式'),
  height: strNumValidator('身高', 0),
  weight: strNumValidator('體重', 0),
  sportLevel: requiredString()
    .regex(/^(underSport|normalSport|moderateSport|severeSport|overSport)$/, '運動量格式錯誤'),
  fitnessLevel: requiredString()
    .regex(/^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/, '健身目標格式錯誤'),
  bio: requiredString().max(100, '自我介紹長度需小於 100 個字元')
}));

export const updatePasswordSchema = validate(z.object({
  password: passwordValidator
}));
