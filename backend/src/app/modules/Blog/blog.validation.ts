

import { z } from "zod";

const blogValidationSchema = z.object({
    body:z.object({
        title:z.string({required_error:"Title is required!"}),
        content:z.string({required_error:"Content is required!"}),
        author:z.string(),
        publishedDate:z.date().optional(),
        image:z.string(),
        isPublished: z.boolean().optional()


    })
})
const blogUpdateValidationSchema = z.object({
    body:z.object({
        title:z.string().optional(),
        content:z.string().optional(),
        author:z.string().optional(),
        isPublished: z.boolean().optional()
    })
})
export const ValidationSchema = {
    blogValidationSchema,
    blogUpdateValidationSchema
}   