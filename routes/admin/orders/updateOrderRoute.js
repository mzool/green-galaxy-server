import express from "express"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import deleteItemFromOrder from "../../../contorllers/admin/orders/deleteItemFromOrder.js"
import updateOrderVarient from "../../../contorllers/admin/orders/edietOrderVarient.js"
import editOrderStatus from "../../../contorllers/admin/orders/editOrderStatus.js"
import generateOrderReciepte from "../../../contorllers/admin/orders/generateOrderReciept.js"
/// router
const updateOrderRouter = express.Router();

/// delete item from order
updateOrderRouter.delete("/delete-item-from-order", authorizeReq, isAdmin, deleteItemFromOrder);
/// update order varient
updateOrderRouter.put("/update-order-varient", authorizeReq, isAdmin, updateOrderVarient);
/// order status
updateOrderRouter.put("/update-order-status", authorizeReq, isAdmin, editOrderStatus)

export default updateOrderRouter