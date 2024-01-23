import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import authUser from "../../middlewares/auth/checkUser.js"
import changePassword from "../../contorllers/user/changePassword.js"

const changePasswordRouter = express.Router();

changePasswordRouter.put("/change-password-user", authorizeReq, authUser, changePassword)


export default changePasswordRouter