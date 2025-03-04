import { ObjectId, Schema, model } from 'mongoose';
import { IReview } from './review.interface'; 

const reviewSchema = new Schema<IReview>(
   {
      review: {
         type: String,
         required: [true, 'Review text is required.'],
         trim: true,
      },
      rating: {
         type: Number,
         required: [true, 'Rating is required.'],
         min: [1, 'Rating must be at least 1.'],
         max: [5, 'Rating cannot be greater than 5.'],
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      meal: {
         type: Schema.Types.ObjectId,
         ref: 'Meal',
         required: true,
      },
     
   },
   {
      timestamps: true,
   }
);

export const Review = model<IReview>('Review', reviewSchema);
