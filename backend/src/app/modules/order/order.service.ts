import mongoose, { Types } from "mongoose";
import { IJwtPayload } from "../auth/auth.interface";
import { IOrder } from "./order.interface";
import { Order } from "./order.model"
import { EmailHelper } from "../../utils/emailHelper";
import User from "../user/user.model";
import AppError from "../../errors/appError";

import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import mealModel from "../Meal/meal.model";
import { orderUtils } from "./order.utils";
const createOrder = async (
  orderData: Partial<IOrder>,
  authUser: IJwtPayload,
  client_ip: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!orderData.products) {
      throw new AppError(httpStatus.BAD_REQUEST, "No products in order");
    }

    let totalPrice = 0;
    const productDetails = await Promise.all(
      orderData.products.map(async (item) => {
        const meal = await mealModel.findById(item.meal)
          .select("price stock")
          .session(session);

        if (!meal) throw new AppError(httpStatus.NOT_FOUND, "Product not found");

        if (meal.stock < item.quantity) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Insufficient stock for product: ${meal.name}`
          );
        }

        // Deduct stock
        meal.stock -= item.quantity;
        await meal.save({ session });

        totalPrice += meal.price * item.quantity;
        return {
          meal: item.meal,
          quantity: item.quantity,
          unitPrice: meal.price,
          deliverySchedule: item.deliverySchedule,
          dietaryPreferences: item.dietaryPreferences,
        };
      })
    );

    // Create the order
    let order = new Order({
      user: authUser.userId,
      products: productDetails,
      totalAmount: totalPrice,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    });

    await order.save({ session });
     


    // Payment processing
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: authUser.name,
      customer_phone: authUser.role || "N/A",
      customer_email: authUser.email,
      customer_address: orderData.shippingAddress,
      customer_city: orderData?.shippingAddress,
      client_ip: client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      await order.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }

    // ✅ Commit transaction before sending email
    await session.commitTransaction();
    session.endSession();

    try {;
      const emailContent = await EmailHelper.createEmailContent(
        { userName: authUser.name || "" },
        "orderInvoice"
      );

      await EmailHelper.sendEmail(
        authUser.email,
        emailContent,
        "Order confirmed!"
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return payment.checkout_url;
  } catch (error) {
    console.error("Order Creation Error:", error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    session.endSession();
    throw error;
  }
};


const getProviderOrder = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload
) => {
  if (!authUser?.userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated!");
  }

  const providerExists = await User.findById(authUser.userId).select;
  if (!providerExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Provider not found!");
  }

  console.log("Provider Exists:", providerExists);
  const orders = await Order.find().populate('products.meal').populate("user")

  console.log("Orders Found:", orders); 

  return {
    meta: { total: orders.length },
    result: orders,
  };
};



const getOrderDetails = async (orderId: string) => {
  const order = await Order.findById(orderId)
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not Found");
  }

  return order;
};

const getMyOrders = async (
  query: Record<string, unknown>,
  authUser: IJwtPayload
) => {
  const orderQuery = new QueryBuilder(
    Order.find({ user: authUser.userId }).populate("user products.meal"),
    query
  )
    .search(["user.name", "user.email", "products.product.name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const changeOrderStatus = async (
  orderId: string,
  orderStatus: string,
  authUser: IJwtPayload
) => {
  const order = await Order.findOneAndUpdate(
    { _id: new Types.ObjectId(orderId),  },
    { orderStatus },
    { new: true }
  );
  return order;
};
const changeStatus = async (
  orderId: string,
  status: string,
  authUser: IJwtPayload
) => {
  const order = await Order.findOneAndUpdate(
    { _id: new Types.ObjectId(orderId),  },
    { status },
    { new: true }
  );
  return order;
};

export const OrderService = {
  createOrder,
  getProviderOrder,
  getOrderDetails,
  getMyOrders,
  changeOrderStatus,
  changeStatus
};
