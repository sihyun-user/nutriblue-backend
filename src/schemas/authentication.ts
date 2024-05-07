import { z } from 'zod';

import { required, noSpecialChar } from './index';

export const registerSchema = z.object({
  id: z.string({ required_error: required('id') }),
  name: noSpecialChar(2, '顯示名稱長度需大於 2 個字元'),
  username: noSpecialChar(
    6,
    '使用者名稱長度需大於 6 個字元',
    /^[a-zA-Z0-9]*$/,
    '只能包含英文、數字'
  ),
  email: z.string({ required_error: required('信箱') }).email({ message: '請輸入正確的信箱' }),
  password: z.string({ required_error: required('密碼') }).min(6, '密碼長度需大於 6 個字元')
});

export const loginSchema = z.object({
  email: z.string({ required_error: required('信箱') }).email({ message: '請輸入正確的信箱' }),
  password: z.string({ required_error: required('密碼') }).min(6, '密碼長度需大於 6 個字元')
});
