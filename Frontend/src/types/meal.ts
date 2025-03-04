

export interface IMeal {
  _id: string;
  name: string;
  description: string;
  slug:string;
  provider:   string; 
  ingredients: string[];
  price: number;
  dietaryTags: string[];
  category: {
    _id: string;
    name: string;
  };
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
