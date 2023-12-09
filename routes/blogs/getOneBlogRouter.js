import express from "express"
import getOneBlog from "../../contorllers/blogs/getOneBlog.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const getOneBlogRouter = express.Router();

getOneBlogRouter.get("/get-one-blog", authorizeReq,getOneBlog)

export default getOneBlogRouter