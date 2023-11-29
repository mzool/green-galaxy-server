import express from "express";
import getAllProductsAdmin from "../../../contorllers/admin/products/getAll.js";
import isAdmin from '../../../middlewares/admins/isAdmin.js';

const getAllProductsAdminRouter = express.Router();

getAllProductsAdminRouter.get("/get-all-products-admin", isAdmin, getAllProductsAdmin);

export default getAllProductsAdminRouter