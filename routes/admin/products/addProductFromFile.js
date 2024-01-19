import express from "express"
import addProductsFromExcelFile from "../../../contorllers/admin/products/addProductFile.js"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import uploadFile from "../../../middlewares/files upload/excelFile.upload.js"
const addProductFileRouter = express.Router();

addProductFileRouter.post("/add-product-file", authorizeReq, isAdmin, uploadFile, addProductsFromExcelFile)

export default addProductFileRouter