import getAllProductsAdminRouter from "./products/getAllRouter.js";
import checkAdminCookieRouter from './checkAdminCookie.js'
import getOtpRouter from "./getOtp.js"
import editProductRouter from "./products/editroute.js"
import sendOtpROuter from "./sendOtp.js"
import deleteProductRouter from "./products/deleteProductRouter.js";
import imageGeneratorRouter from "./imageGenerator/generateImageAdmin.js";
import editStyleRouter from "./client/editeHomeStyle.js";
import contactUsAdminRouter from "./contactUs/contactUsAdminRoute.js";
import addProductFileRouter from "./products/addProductFromFile.js";
import getAllOrdersRouter from "./orders/getAllOrdersRoute.js";
import updateOrderRouter from "./orders/updateOrderRoute.js";
import employeesRouter from "./employees/allEmployeesRoutes.js";
export {
    getAllProductsAdminRouter, checkAdminCookieRouter, getOtpRouter,
    editProductRouter, sendOtpROuter, deleteProductRouter, imageGeneratorRouter,
    editStyleRouter, contactUsAdminRouter, addProductFileRouter, getAllOrdersRouter,
    updateOrderRouter, employeesRouter
}