import { Date, Types } from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    author: string;
    publishedDate?:string
    image:string
    ingredients: string[];
    instructions: string[]; 
    servings: number;  
       
    tags?: string[];       

    isPublished?: boolean;
    
}