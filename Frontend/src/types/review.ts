export interface TReview {
    _id: string;
    review: string;
    rating: number;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    meal: {
      imageUrls:string
      name: string
    };
    createdAt: string;
    updatedAt: string;
  }
  