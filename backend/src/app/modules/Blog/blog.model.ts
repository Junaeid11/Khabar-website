import  { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: [true, 'Image is required!']
    },
    ingredients: {
        type: [String], // Array of strings for ingredients
        required: [true, 'Ingredients are required!']
    },
    instructions: {
        type: [String], // Array of strings for instructions
        required: [true, 'Instructions are required!']
    },
    servings: {
        type: Number,
        required: [true, 'Number of servings is required!']
    },
  
    tags: {
        type: [String], 
    },
    isPublished: {
        type: Boolean,
        default: true 
    }
}, {
    timestamps: true 
});


blogSchema.set('toJSON', {
    transform:(doc,value)=>{
        delete value.__v
        return value
    }
})


export const BlogModel = model<TBlog>('Blog', blogSchema)