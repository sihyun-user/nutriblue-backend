export interface INutritions {
  [key: string]: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  sugar: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
}

export interface IFood {
  id: string;
  verified: boolean;
  publiced: boolean;
  name: string;
  brandName: string;
  servingSize: {
    value: number;
    unit: string;
    container: number;
  };
  nutritions: INutritions;
  bookmarkCollects?: string[];
}
