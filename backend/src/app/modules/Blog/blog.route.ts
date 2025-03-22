
import Express from "express"
import { ValidationSchema } from "./blog.validation"
import { blogController } from "./blog.controller"
import validateRequest from "../../middleware/validateRequest"
const router = Express.Router()
router.post('/', validateRequest(ValidationSchema.blogValidationSchema), blogController.createBlog)
router.get('/blog', blogController.getAllBlogs)
router.patch('/:id', validateRequest(ValidationSchema.blogUpdateValidationSchema), blogController.updateBlog)
router.delete('/:id', blogController.deleteBlog)
router.get('/:id', blogController.getSingleBlog)
export const BlogRoute = router 