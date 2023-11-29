import express from "express"
import getAllBlogs from "../../contorllers/blogs/getBlogs.js";
const getAllBlogsRouter = express.Router();


getAllBlogsRouter.get("/get-all-blogs", getAllBlogs);


export default getAllBlogsRouter