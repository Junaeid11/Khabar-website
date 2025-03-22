import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IImageFiles } from '../../interface/IImageFile';
import QueryBuilder from '../../builder/QueryBuilder';
import { Order } from '../order/order.model';
import { Review } from '../review/review.model';
import { IMeal } from './meal.interface';
import mealModel from './meal.model';
import { JwtPayload } from 'jsonwebtoken';
import User from '../user/user.model';

const createMeal = async (
   mealData: Partial<IMeal>,
   productImages: IImageFiles,
   decoded: JwtPayload
) => {
   const { images } = productImages;

   if (!images || images.length === 0) {
      throw new AppError(
         StatusCodes.BAD_REQUEST,
         'Meal images are required.'
      );
   }
   mealData.imageUrls = images.map((image) => image.path);

   if (decoded && decoded.userId) {
      mealData.provider = decoded.userId;
   } else {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Provider not authenticated');
   }
   const newProduct = new mealModel({
      ...mealData,
   });
   const result = await newProduct.save();
   const providerId = result.provider;

   return {
      result,
      providerId,
   };

};


const getAllMeal = async (query: Record<string, unknown>) => {
   const {
      inStock,
      ratings,
      ...pQuery
   } = query;
   const filter: Record<string, any> = {};
   if (inStock !== undefined) {
      filter.stock = inStock === 'true' ? { $gt: 0 } : 0;
   }
   if (ratings) {
      const ratingArray = typeof ratings === 'string'
         ? ratings.split(',')
         : Array.isArray(ratings) ? ratings : [ratings];
      filter.averageRating = { $in: ratingArray.map(Number) };
   }


   const mealQuery = new QueryBuilder(
      mealModel.find().populate('category').populate('provider')
      ,
      pQuery
   )
      .search(['name', 'description'])
      .filter()
      .sort()
      .paginate()
      .fields()

   const meals = await mealQuery.modelQuery.lean();
   console.log(meals)

   const meta = await mealQuery.countTotal();


   return {
      meta,
      result: meals,
   };
};

const getSingleMeal = async (mealId: string) => {
   const meal = await mealModel.findById(mealId)
      ;

   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Meal not found');
   }
   const reviews = await Review.find({ meal: meal._id }).populate('user');

   const productObj = meal.toObject();

   return {
      ...productObj,
      reviews
   };
};
const updateMeal = async (
   mealId: string,
   payload: Partial<IMeal>,
   productImages: IImageFiles,
   authUser: JwtPayload
) => {
   const { images } = productImages;

   const user = await User.findById(authUser.userId);
   const meal = await mealModel.findOne({
      _id: mealId,
   });

   if (!user?.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
   }
   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Meal Not Found');
   }

   if (images && images.length > 0) {
      payload.imageUrls = images.map((image) => image.path);
   }

   return await mealModel.findByIdAndUpdate(mealId, payload, { new: true });
};

const deleteMeal = async (mealId: string, authUser: JwtPayload) => {
   const user = await User.findById(authUser.userId);
   const meal = await mealModel.findOne({
      _id: mealId,
   });

   if (!user?.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
   }
   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
   }

   return await mealModel.findByIdAndDelete(mealId);
};




export const ProductService = {
   createMeal,
   getAllMeal,
   getSingleMeal,
   updateMeal,
   deleteMeal
}
