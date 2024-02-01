import express from "express"
import addProduct from "../../contorllers/products/addProduct.js"
import _upload from "../../middlewares/files upload/upload.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import addProductSchema from "../../middlewares/validation/products/addProductSchema.js"
import isAdmin from "../../middlewares/admins/isAdmin.js"
import resizeProductImage from "../../middlewares/imagesController/productsImages.js"
///
const addProductRouter = express.Router();

addProductRouter.post("/add-product-inputs", isAdmin, _upload, validateRequest(addProductSchema), addProduct)


export { addProductRouter }