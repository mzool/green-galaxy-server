import express from "express"
import newCommentSchema from "../../middlewares/blogs/commentSchema.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import AddNewComment from "../../controllers/blogs/newComment.js"

const newCommentRouter = express.Router();

newCommentRouter.post("/new-blog-comment", AddNewComment)


export default newCommentRouter