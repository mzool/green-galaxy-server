import express from "express"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import getAllOrders from "../../../contorllers/admin/orders/getAllOrders.js"

const getAllOrdersRouter = express.Router()

getAllOrdersRouter.get("/get-all-orders-admin", isAdmin, getAllOrders)

export default getAllOrdersRouter