export interface IOrder {
  products: IOrderMeal[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface IOrderMeal {
  meal: string;
  quantity: number;
  deliverySchedule: string,
  dietaryPreferences: string


}
interface Transaction {
  id: string;
  transactionStatus: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Meal {
  _id: string;
  name: string;
  description: string;
  slug: string;
  provider: string;
  ingredients: string[];
  price: number;
  dietaryTags: string[];
  imageUrls: string[];
  category: string;
  isActive: boolean;
  rating: number;
  ratingCount: number;
  preparationTime: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface meal {
  meal: Meal;
  quantity: number;
  deliverySchedule: string;
  dietaryPreferences: string;
  _id: string;
}

export interface TOrder {
  transaction: Transaction;
  _id: string;
  user: User;
  products: meal[];
  totalAmount: number;
  status: string;
  orderStatus: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  on: boolean;
}



