import express from "express";
import getAllProductsAdmin from "../../../contorllers/admin/products/getAll.js";
import isAdmin from '../../../middlewares/admins/isAdmin.js';
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
const getAllProductsAdminRouter = express.Router();

getAllProductsAdminRouter.get("/get-all-products-admin", authorizeReq, isAdmin, getAllProductsAdmin);

export default getAllProductsAdminRouter