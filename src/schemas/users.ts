import { z } from 'zod';

import { required, nameValidator, usernameValidator } from './index';

export const updateUserSchema = z.object({
  name: nameValidator,
  username: usernameValidator,
  gender: z.string({ required_error: required('性別') }).regex(/^[01]$/, '性別只能為 0 或 1'),
  birthday: z
    .string({ required_error: required('生日') })
    .regex(/^(\d{4})-(\d{2})-(\d{2})$/, '生日格式錯誤，請輸入 YYYY-MM-DD 格式'),
  height: z.number({ required_error: required('身高') }).min(0, '身高需大於 0'),
  weight: z.number({ required_error: required('體重') }).min(0, '體重需大於 0'),
  sportLevel: z
    .string({ required_error: required('運動量') })
    .regex(/^(underSport|normalSport|moderateSport|severeSport|overSport)$/, '運動量格式錯誤'),
  fitnessLevel: z
    .string({ required_error: required('健身目標') })
    .regex(/^(loseFat|gentleLoseFat|keepWeight|gentleAddFat|addFat)$/, '健身目標格式錯誤'),
  bio: z.string().max(100, '自我介紹長度需小於 100 個字元')
});
