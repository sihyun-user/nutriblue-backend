import { z } from 'zod';

import validate from '../middlewares/validate';
import {
  requiredString,
  requiredNumber,
  nameValidator,
  passwordValidator,
  numValidator
} from './index';

export const updateUserSchema = validate(
  z.object({
    name: nameValidator,
    gender: requiredNumber().refine((value) => [0, 1].includes(value), {
      message: '性別只能為 0 或 1'
    }),
    birthday: requiredString().regex(
      /^(\d{4})-(\d{2})-(\d{2})$/,
      '生日格式錯誤，請輸入 yyyy-MM-dd 格式'
    ),
    height: numValidator('身高'),
    weight: numValidator('體重'),
    sport_level: requiredString().regex(
      /^(underSport|normalSport|moderateSport|severeSport|overSport)$/,
      '運動量格式錯誤'
    ),
    fitness_level: requiredString().regex(
      /^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/,
      '健身目標格式錯誤'
    )
  })
);

export const updatePasswordSchema = validate(
  z.object({
    password: passwordValidator(),
    confirm_password: passwordValidator('確認密碼')
  }).refine((data) => data.password === data.confirm_password, {
    message: '密碼和確認密碼必須相同',
    path: ['confirm_password']
  })
);
