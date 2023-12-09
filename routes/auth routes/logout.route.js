import express from "express"
import logout from "../../contorllers/authentication/logout.js"
import authrizeReq from "../../middlewares/auth/API_authorization.js"
const logoutRouter = express.Router();

logoutRouter.get("/logout", authrizeReq, logout)

export default logoutRouter