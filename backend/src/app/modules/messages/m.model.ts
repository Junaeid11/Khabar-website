import { model, Schema } from "mongoose";
import { TMessage } from "./m.interface";

const messageSchema = new Schema<TMessage>({
    name: {
        type: String,
        required: [true, 'Name is required!']

    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    message: {
        type: String,

    },
}, {
    timestamps: true
})



export const Contact = model<TMessage>('contact', messageSchema);