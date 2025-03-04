import { Schema } from 'mongoose';

export interface IReview {
   review: string;
   rating: number;
   user: Schema.Types.ObjectId;
   product: Schema.Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
}
