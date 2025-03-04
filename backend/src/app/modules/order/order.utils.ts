/* eslint-disable @typescript-eslint/no-explicit-any */
import ShurjoPay, { PaymentResponse, VerificationResponse} from 'shurjopay'
import config from '../../config'


const shurjoPay = new ShurjoPay()

shurjoPay.config(
    config.sp.sp_endpoint!,
    config.sp.sp_username!,
    config.sp.sp_password!,
    config.sp.sp_prefix!,
    config.sp.sp_return_url!


    
)

const makePaymentAsync = async (
    paymentPayload: any
  ): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
      shurjoPay.makePayment(
        paymentPayload,
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  };
  const verifyPaymentAsync = (
    order_id: string
  ): Promise<VerificationResponse[]> => {
    return new Promise((resolve, reject) => {
      shurjoPay.verifyPayment(
        order_id,
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  };

export const orderUtils = {
    makePaymentAsync,
    verifyPaymentAsync
}