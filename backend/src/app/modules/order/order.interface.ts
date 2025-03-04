import { Types, Document } from 'mongoose';


export interface IOrder extends Document {
  user: Types.ObjectId;
  products: [
    {
      meal: Types.ObjectId;
      quantity: number;
      deliverySchedule: string;
      dietaryPreferences: string;
    }
  ]
  totalAmount: number;
  status: 'Pending' |'Accepted'| 'Cancelled';
  orderStatus: 'Preparing' | 'Ready' | 'On Way' | 'Delivered';
  shippingAddress: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  transaction: {
    id: string;
    customerName: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
