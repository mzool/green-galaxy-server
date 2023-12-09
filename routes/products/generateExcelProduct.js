import express from "express"
import GenerateProductExcelFile from "../../contorllers/products/downloadExcel.js"
import isAdmin from "../../middlewares/admins/isAdmin.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const excelRouter = express.Router();
excelRouter.get("/all-product-excel", authorizeReq, isAdmin, GenerateProductExcelFile);
export default excelRouter