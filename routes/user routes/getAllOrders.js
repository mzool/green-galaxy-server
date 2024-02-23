import express from "express"
import authUser from "../../middlewares/auth/checkUser.js"
import getAllUserOrders from "../../controllers/user/getAllUserOrders.js"

const getAllOrderRouter = express.Router();

getAllOrderRouter.get("/get-all-order-user", authUser, getAllUserOrders)


export default getAllOrderRouter