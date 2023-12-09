import express from "express"
import addProduct from "../../contorllers/products/addProduct.js"
import _upload from "../../middlewares/files upload/upload.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import addProductSchema from "../../middlewares/validation/products/addProductSchema.js"
import isAdmin from "../../middlewares/admins/isAdmin.js"
import authrizeReq from "../../middlewares/auth/API_authorization.js"
///
const addProductRouter = express.Router();

addProductRouter.post("/add-product-inputs", authrizeReq, _upload, validateRequest(addProductSchema), isAdmin, addProduct)


export { addProductRouter }