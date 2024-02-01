import express from "express"
import addBlog from "../../../contorllers/admin/blogs/addBlog.js"
import isAdmin from '../../../middlewares/admins/isAdmin.js'
import validateRequest from "../../../middlewares/validation/validationFunction.js"
import newBlogSchema from "../../../middlewares/blogs/newBlogSchema.js"
import upload from "../../../middlewares/files upload/upload.js"

const blogRouter = express.Router()
/// add blog
blogRouter.post("/new-blog", isAdmin, upload, validateRequest(newBlogSchema),  addBlog)
/// delete blog
/// edit blog



export default blogRouter