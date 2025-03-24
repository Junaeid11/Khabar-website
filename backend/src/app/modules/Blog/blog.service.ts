/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */


import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/appError"

import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"

import httpStatus from "http-status"

const createBlogIntoDb = async (payload: TBlog) => {
    const result = await BlogModel.create(payload);
    return result

}
const updateBlogFromDb = async (id: string, payload: TBlog) => {
    const blog = await BlogModel.findById(id).populate("author");
    console.log(blog)
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }
    const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true }).populate('author')
    return result
}
const deleteBlogFromDb = async (id: string,) => {
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}
const getAllBlogs = async (query: Record<string, unknown>) => {
    const blogsSearchableFields = ['title', 'content']
    const blogsQuery = new QueryBuilder(BlogModel.find(), query).search(blogsSearchableFields).filter().sort();
    const result = await blogsQuery.modelQuery
    console.log(result)

    return result
}
const getSingleBlogs = async (id:string)=>{
    const blog = await BlogModel.findById(id)
    return blog

}


export const blogService = {
    createBlogIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb,
    getAllBlogs,
    getSingleBlogs
}