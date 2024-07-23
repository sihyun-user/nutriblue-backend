import { format, parse, differenceInYears } from 'date-fns';

export const formatedDate = (value: Date): string => format(value, 'yyyy-MM-dd');

export const calcAge = (birthday: string): number => {
  const date = parse(birthday, 'yyyy-MM-dd', new Date());
  const age = differenceInYears(new Date(), date);
  return age;
};

export const calcCaloriesInTake = (
  birthday: string,
  weight: number,
  height: number,
  gender: number,
  sportLevel: string,
  fitnessLevel: string
) => {
  let age = 0;
  let bmr = 0;
  let tdee = 0;
  let caloriesInTake = 0;

  // 1) 基礎代謝率 BMR (9.99 × 體重 + 6.25 × 身高 - 4.92 × 年齡 +(166 × 性別 (男 1、女 0) - 161))
  age = calcAge(birthday);
  bmr = Math.round(9.99 * weight + 6.25 * height - 4.92 * age + (166 * gender - 161));

  // 2) 每日消耗總熱量 TDEE: BMR × 活動量
  switch (sportLevel) {
    case 'underSport':
      tdee = bmr * 1.2;
      break;
    case 'normalSport':
      tdee = bmr * 1.375;
      break;
    case 'moderateSport':
      tdee = bmr * 1.55;
      break;
    case 'severeSport':
      tdee = bmr * 1.725;
      break;
    case 'overSport':
      tdee = bmr * 1.9;
      break;
    default:
  }
  tdee = Math.round(bmr);

  // 3) 每日建議攝取熱量
  switch (fitnessLevel) {
    case 'loseFat':
      caloriesInTake = tdee * 0.8;
      break;
    case 'gentleLoseFat':
      caloriesInTake = tdee * 0.9;
      break;
    case 'keepWeight':
      caloriesInTake = tdee;
      break;
    case 'gentleAddFat':
      caloriesInTake = tdee * 1.1;
      break;
    case 'addFat':
      caloriesInTake = tdee * 1.2;
      break;
    default:
  }
  caloriesInTake = Math.round(caloriesInTake);

  return caloriesInTake;
};
