import express from "express"
import getAllBlogs from "../../contorllers/blogs/getBlogs.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js";
const getAllBlogsRouter = express.Router();


getAllBlogsRouter.get("/get-all-blogs", getAllBlogs);


export default getAllBlogsRouter