import express from "express"
import authUser from "../../middlewares/auth/checkUser.js"
import enableTowStepsLogin from "../../contorllers/user/enableTowStepsLogin.js";
import {towStepsLoginLimiter} from "../../services/limitRequests.js"


const enableTowStepsLoginRouter = express.Router();

enableTowStepsLoginRouter.put("/enable-tow-steps-login-user", authUser, towStepsLoginLimiter, enableTowStepsLogin)


export default enableTowStepsLoginRouter