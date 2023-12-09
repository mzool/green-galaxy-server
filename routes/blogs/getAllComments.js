import express from "express"
import getAllComments from "../../contorllers/blogs/getAllComments.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"

const allCommentsRouter = express.Router();
allCommentsRouter.get("/get-all-comments", authorizeReq, getAllComments)

export default allCommentsRouter