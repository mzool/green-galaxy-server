import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import authUser from "../../middlewares/auth/checkUser.js"
import getAllUserOrders from "../../contorllers/user/getAllUserOrders.js"

const getAllOrderRouter = express.Router();

getAllOrderRouter.get("/get-all-order-user", authorizeReq, authUser, getAllUserOrders)


export default getAllOrderRouter