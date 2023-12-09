import express from "express"
import deleteCartItme from "../../contorllers/cart/deleteItem.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const DeleteCartItemRouter = express.Router();

DeleteCartItemRouter.delete("/delete-cart-item", authorizeReq, deleteCartItme);

export default DeleteCartItemRouter