import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredNumber, nameValidator, passwordValidator, numValidator } from './index';

export const updateUserSchema = validate(z.object({
  name: nameValidator,
  gender: requiredNumber().refine(value => [0, 1].includes(value), { message: '性別只能為 0 或 1' }),
  birthday: requiredString().regex(/^(\d{4})-(\d{2})-(\d{2})$/, '生日格式錯誤，請輸入 YYYY-MM-DD 格式'),
  height: numValidator('身高'),
  weight: numValidator('體重'),
  sport_level: requiredString()
    .regex(/^(underSport|normalSport|moderateSport|severeSport|overSport)$/, '運動量格式錯誤'),
  fitness_level: requiredString()
    .regex(/^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/, '健身目標格式錯誤'),
  bio: requiredString().max(100, '自我介紹長度需小於 100 個字元')
}));

export const updatePasswordSchema = validate(z.object({
  password: passwordValidator
}));
