import { model, Schema } from "mongoose";
import {  TSubscribe } from "./m.interface";

const messageSchema = new Schema<TSubscribe>({

    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
}, {
    timestamps: true
})



export const Subscribe = model<TSubscribe>('Subscribe', messageSchema);