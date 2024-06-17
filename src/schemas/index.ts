import { z } from 'zod';

export const required = (field: string) => `${field}為必填欄位`;
export const requiredString = () => z.string({ required_error: '欄位未填寫正確' });

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

export const strNumValidator = (field: string) => 
  z.string().refine(value => {
  const numberValue = parseFloat(value);
  return !isNaN(numberValue) && numberValue >= 0;
}, `${field}不可小於0或為空值`);

export const nameValidator = noSpecialChar('名稱', 2, 12);

export const emailValidator = z
  .string({ required_error: required('信箱') })
  .email({ message: '請輸入正確的信箱' });

export const passwordValidator = z
  .string({ required_error: required('密碼') })
  .min(6, '密碼長度需大於 6 個字元');

export const nutritionsValidator = z.object({
  calories: strNumValidator('卡路里').optional(),
  carbohydrates: strNumValidator('碳水化合物').optional(),
  protein: strNumValidator('蛋白質').optional(),
  fat: strNumValidator('脂肪').optional(),
  saturatedFat: strNumValidator('飽和脂肪').optional(),
  transFat: strNumValidator('反式脂肪').optional(),
  sodium: strNumValidator('鈉').optional(),
  sugar: strNumValidator('糖').optional(),
});


