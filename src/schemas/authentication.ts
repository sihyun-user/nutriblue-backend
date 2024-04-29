import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({ required_error: '暱稱為必填欄位' })
    .regex(/^[a-zA-Z0-9_]*$/, '只能包含英文、數字及底線，不可包含空白及特殊符號'),
  email: z.string({ required_error: '信箱為必填欄位' }).email({ message: '請輸入正確的信箱' }),
  password: z.string({ required_error: '密碼為必填欄位' }).min(6, '密碼長度需大於 6 個字元')
});

export const loginSchema = z.object({
  email: z.string({ required_error: '信箱為必填欄位' }).email({ message: '請輸入正確的信箱' }),
  password: z.string({ required_error: '密碼為必填欄位' }).min(6, '密碼長度需大於 6 個字元')
});
