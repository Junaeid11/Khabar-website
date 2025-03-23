
import { EmailHelper } from "../../utils/emailHelper";
import {  Subscribe } from "./m.model";

const createSubscription = async (payload: { email: string }) => {
    try {
        const existingSubscriber = await Subscribe.findOne({ email: payload.email });
        if (existingSubscriber) {
            throw new Error("Email already subscribed!");
        }
        const result = await Subscribe.create(payload);
        const emailContent = await EmailHelper.createEmailContent(
            { email: payload.email },
            "newsletterConfirmation"
        );
        await EmailHelper.sendEmail(
            payload.email,
            emailContent,
            "Subscription Confirmed!"
        );

        return result;

    } catch (error) {
        
        return console.error("Subscription error:", error);
    }
};

export default createSubscription;

const getAllMessage = async (query: Record<string, unknown>) => {
    const result = await Subscribe.find(query); 
    return result;
  };
export const messageService = {
  createSubscription,
 getAllMessage

}