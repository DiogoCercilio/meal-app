export interface Meal {
  id: number;
  name: string;
  image: string;
}

export interface UserMeal {
  id?: number;
  mealId: number;
  quantity: number;
  unitMeasure: string;
  details: string;
  userId: number;
}

export interface UserMealResponse {
  id?: number;
  created: string;
  calories: number;
  description: string;
  name: string;
  image: string;
  mealId: number;
  quantity: number;
  unitMeasure: string;
  details: string;
  userId: number;
}

export interface MealItemCardProps {
  category: {
    banner: string;
    name: string;
  };
  onClick: any;
}

export interface MealItemProps {
  data: UserMealResponse;
  onChange: any;
}

export interface MealFormProps {
  data: any;
  onChange: any;
}
