import { z } from 'zod';

export const required = (field: string) => `${field}為必填欄位`;
export const requiredString = () => z.string({ required_error: '欄位未填寫正確' });
export const requiredNumber = () => z.number({ required_error: '欄位未填寫正確' });
export const requiredBoolean = () => z.boolean({ required_error: '欄位未填寫正確' });

export const noSpecialChar = (
  field: string,
  minLength: number,
  maxLength: number,
  regex?: RegExp,
  regexMessage?: string
) => {
  let schema = requiredString();
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

export const numValidator = (field: string, minLength = 0) =>
  requiredNumber().refine((value) => value >= minLength, `${field}不可小於${minLength}`);

export const nameValidator = noSpecialChar('名稱', 2, 12);

export const emailValidator = z
  .string({ required_error: required('信箱') })
  .email({ message: '請輸入正確的信箱' });

export const passwordValidator = (field: string = '密碼') => z
  .string({ required_error: required(field) })
  .min(6, `${field}長度需大於 6 個字元`);