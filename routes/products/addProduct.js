import express from "express"
import addProduct from "../../contorllers/products/addProduct.js"
import _upload from "../../middlewares/files upload/upload.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import addProductSchema from "../../middlewares/validation/products/addProductSchema.js"
import isAdmin from "../../middlewares/admins/isAdmin.js"
///
const addProductRouter = express.Router();

addProductRouter.post("/add-product-inputs", _upload, validateRequest(addProductSchema), isAdmin, addProduct)


export { addProductRouter }