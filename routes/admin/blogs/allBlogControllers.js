import express from "express"
import addBlog from "../../../controllers/admin/blogs/addBlog.js"
import isAdmin from '../../../middlewares/admins/isAdmin.js'
import validateRequest from "../../../middlewares/validation/validationFunction.js"
import newBlogSchema from "../../../middlewares/blogs/newBlogSchema.js"
import upload from "../../../middlewares/files upload/upload.js"
import deleteBlog from "../../../controllers/admin/blogs/deleteBlog.js"
import getAllBlogs from "../../../controllers/admin/blogs/getAll.js"
import editBlog from "../../../controllers/admin/blogs/editeBlog.js"

const blogRouter = express.Router()
/// add blog
blogRouter.post("/new-blog", isAdmin, upload, validateRequest(newBlogSchema), addBlog)
/// delete blog
blogRouter.delete("/delete-blog/:blog_id", isAdmin, deleteBlog);
/// get all blogs
blogRouter.get("/get-all-blogs-admin", isAdmin, getAllBlogs)
/// edit blog
blogRouter.put("/admin-edit-blog", isAdmin, upload, editBlog)


export default blogRouter