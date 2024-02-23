import express from "express"
import authUser from "../../middlewares/auth/checkUser.js"
import deleteUserOrderFromProfile from "../../controllers/user/deleteOrder.js";
const cancellOrderRouter = express.Router();

cancellOrderRouter.put("/cancell-order-user", authUser, deleteUserOrderFromProfile)


export default cancellOrderRouter