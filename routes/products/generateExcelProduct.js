import express from "express"
import GenerateProductExcelFile from "../../controllers/products/downloadExcel.js"
import isAdmin from "../../middlewares/admins/isAdmin.js"

const excelRouter = express.Router();
excelRouter.get("/all-product-excel", isAdmin, GenerateProductExcelFile);
export default excelRouter