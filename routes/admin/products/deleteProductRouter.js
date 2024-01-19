import express from "express"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import deleteProduct from "../../../contorllers/admin/products/deleteProduct.js"

const deleteProductRouter = express.Router();
deleteProductRouter.delete("/delete-product", authorizeReq, isAdmin, deleteProduct);

export default deleteProductRouter