import mongoose, { Schema, Types, model } from "mongoose";
import { IOrder } from "./order.interface";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import mealModel from "../Meal/meal.model";

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        meal: {
          type: Schema.Types.ObjectId,
          ref: "Meal",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        deliverySchedule: {
          type: String,
          required: true,
        },
        dietaryPreferences: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ['Preparing' , 'Ready' , 'On Way' , 'Delivered'],
      default: "Preparing",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "Online",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate total, discount, delivery charge, and final price
orderSchema.pre("validate", async function (next) {
  const order = this;
  let totalAmount = 0;


  for (const item of order.products) {
    
    const product = await mealModel.findById(item.meal);
    
    if (!product) {
      console.error("Meal not found:", item.meal);
      return next(new AppError(StatusCodes.NOT_FOUND, "meal not found"));
    }

    totalAmount += product.price * item.quantity;
  }

  order.totalAmount = totalAmount;
  console.log("Total Amount:", totalAmount);
  
  next();
});


export const Order = model<IOrder>("Order", orderSchema);
