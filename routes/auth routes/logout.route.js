import express from "express"
import logout from "../../contorllers/authentication/logout.js"

const logoutRouter = express.Router();

logoutRouter.get("/logout", logout)

export default logoutRouter