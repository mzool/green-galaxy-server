import express from 'express';
import editProduct from '../../../controllers/admin/products/editProduct.js';
import isAdmin from "../../../middlewares/admins/isAdmin.js";
import upload from "../../../middlewares/files upload/upload.js";

const editProductRouter = express.Router();

editProductRouter.put("/edit-product-admin", isAdmin, upload, editProduct);


export default editProductRouter