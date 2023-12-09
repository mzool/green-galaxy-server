import express from 'express';
import editProduct from '../../../contorllers/admin/products/editProduct.js';
import isAdmin from "../../../middlewares/admins/isAdmin.js";
import upload from "../../../middlewares/files upload/upload.js";
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
const editProductRouter = express.Router();

editProductRouter.put("/edit-product-admin",authorizeReq, isAdmin, upload, editProduct);


export default editProductRouter