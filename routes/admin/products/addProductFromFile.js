import express from "express"
import addProductsFromExcelFile from "../../../controllers/admin/products/addProductFile.js"
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import uploadFile from "../../../middlewares/files upload/excelFile.upload.js"
const addProductFileRouter = express.Router();

addProductFileRouter.post("/add-product-file", isAdmin, uploadFile, addProductsFromExcelFile)

export default addProductFileRouter