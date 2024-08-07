import express from "express"
import authUser from "../../middlewares/auth/checkUser.js"
import changePassword from "../../controllers/user/changePassword.js"

const changePasswordRouter = express.Router();

changePasswordRouter.put("/change-password-user", authUser, changePassword)


export default changePasswordRouter