import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import authUser from "../../middlewares/auth/checkUser.js"
import deleteUserOrderFromProfile from "../../contorllers/user/deleteOrder.js";
const cancellOrderRouter = express.Router();

cancellOrderRouter.put("/cancell-order-user", authorizeReq, authUser, deleteUserOrderFromProfile)


export default cancellOrderRouter