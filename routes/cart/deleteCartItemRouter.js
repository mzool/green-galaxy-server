import express from "express"
import deleteCartItme from "../../controllers/cart/deleteItem.js"

const DeleteCartItemRouter = express.Router();

DeleteCartItemRouter.delete("/delete-cart-item", deleteCartItme);

export default DeleteCartItemRouter