import { Document, Types } from "mongoose";

export interface IMeal extends Document {
  name: string;
  description: string;
  slug:string;
  
  category: Types.ObjectId;
  provider: Types.ObjectId; 
  ingredients: string[];
  price: number;
  dietaryTags: string[];
  imageUrls: string[];
  isActive: boolean;
  rating?: number;
  ratingCount?: number;
  preparationTime?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  discountPrice:number
  createdAt?: Date;
  updatedAt?: Date;
  stock: number;

  calculateDiscountPrice(): Promise<number | null>;
}
