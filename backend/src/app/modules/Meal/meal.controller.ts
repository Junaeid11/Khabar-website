import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductService as MealService } from "./meal.service";
import { IImageFiles } from "../../interface/IImageFile";
import { IJwtPayload } from "../auth/auth.interface";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const CreateMeal = catchAsync(async (req: Request, res: Response) => {
  const result = await MealService.createMeal(
    req.body,
    req.files as IImageFiles,
    req.user as IJwtPayload
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal created successfully",
    data: result,
  });
});

const getAllMeal = catchAsync(async (req, res) => {
  const result = await MealService.getAllMeal(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meals are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleMeal = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const result = await MealService.getSingleMeal(mealId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const {
    user,
    body: payload,
    params: { mealId },
  } = req;

  const result = await MealService.updateMeal(
    mealId,
    payload,
    req.files as IImageFiles,
    user as IJwtPayload
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal updated successfully",
    data: result,
  });
});

// hard delete
const deleteProduct = catchAsync(async (req, res) => {
  const {
    user,
    params: {  mealId },
  } = req;

  const result = await MealService.deleteMeal(
    mealId,
    user as IJwtPayload
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal deleted successfully",
    data: result,
  });
});

export const MealController = {
  CreateMeal,
   getAllMeal,
    getSingleMeal,
  updateProduct,
  deleteProduct,
}
