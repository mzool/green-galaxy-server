import express from "express"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import getAllOrders from "../../../contorllers/admin/orders/getAllOrders.js"

const getAllOrdersRouter = express.Router()

getAllOrdersRouter.get("/get-all-orders-admin", authorizeReq, isAdmin, getAllOrders)

export default getAllOrdersRouter