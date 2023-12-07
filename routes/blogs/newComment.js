import express from "express"
import newCommentSchema from "../../middlewares/blogs/commentSchema.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import AddNewComment from "../../contorllers/blogs/newComment.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const newCommentRouter = express.Router();

newCommentRouter.post("/new-blog-comment", authorizeReq, validateRequest(newCommentSchema), AddNewComment)


export default newCommentRouter