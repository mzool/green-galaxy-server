import express from "express"
import getAllComments from "../../contorllers/blogs/getAllComments.js"


const allCommentsRouter = express.Router();
allCommentsRouter.get("/get-all-comments", getAllComments)

export default allCommentsRouter