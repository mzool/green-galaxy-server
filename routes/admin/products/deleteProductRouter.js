import express from "express"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import deleteProduct from "../../../controllers/admin/products/deleteProduct.js"

const deleteProductRouter = express.Router();
deleteProductRouter.delete("/delete-product", isAdmin, deleteProduct);

export default deleteProductRouter