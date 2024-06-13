import { z } from 'zod';

export const required = (field: string) => `${field}為必填欄位`;

export const noSpecialChar = (
  field: string,
  minLength: number,
  maxLength: number,
  regex?: RegExp,
  regexMessage?: string
) => {
  let schema = z.string({ required_error: required(field) });
  if (regex && regexMessage) {
    schema = schema.regex(regex, regexMessage);
  }
  return schema.refine(
    (value) =>
      value.length >= minLength &&
      value.length <= maxLength &&
      /[^\s!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/.test(value),
    {
      message: `${field}需為${minLength}到${maxLength}個字元，且不可包含空白及特殊符號`
    }
  );
};

export const nameValidator = noSpecialChar('名稱', 2, 12);

export const emailValidator = z
  .string({ required_error: required('信箱') })
  .email({ message: '請輸入正確的信箱' });

export const passwordValidator = z
  .string({ required_error: required('密碼') })
  .min(6, '密碼長度需大於 6 個字元');
