

export interface IMeal {
  _id: string;
  name: string;
  description: string;
  slug:string;
  provider:   {
    name: string
  }; 
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
  reviews:{
    id:string
  }
  createdAt?: Date;
  updatedAt?: Date;
  stock: number
}
