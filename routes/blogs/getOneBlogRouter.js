import express from "express"
import getOneBlog from "../../controllers/blogs/getOneBlog.js";

const getOneBlogRouter = express.Router();

getOneBlogRouter.get("/get-one-blog",getOneBlog)

export default getOneBlogRouter