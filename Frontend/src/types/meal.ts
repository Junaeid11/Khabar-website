

export interface IMeal {
  _id: string;
  name: string;
  description: string;
  slug:string;
  provider:   {
    name: string
  }; 
  category: {
    _id: string
    icon: string
    name: string
  }
  ingredients: string[];
  price: number;
  discountPrice: number;
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
  export interface IMealForm {
    name: string;
    description: string;
    slug: string;
    ingredients: string;
    price: string;
    stock: string;
    rating: string;
    ratingCount: string;
    preparationTime: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    dietaryTags: string[];
}

