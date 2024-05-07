import { z } from 'zod';

export const required = (field: string) => `${field} 為必填欄位`;

export const noSpecialChar = (
  minLength: number,
  minLengthMessage: string,
  regex?: RegExp,
  regexMessage?: string
) => {
  let schema = z.string().min(minLength, minLengthMessage);
  if (regex && regexMessage) {
    schema = schema.regex(regex, regexMessage);
  }
  return schema.refine((value) => !/[^\s!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/.test(value), {
    message: '不可包含空白及特殊符號'
  });
};
