import getOneProduct from "../../contorllers/products/getOneProduct.js"
import authrizeReq from "../../middlewares/auth/API_authorization.js"
import express from "express"

const onePrRouter = express.Router();

onePrRouter.get("/get-product", authrizeReq, getOneProduct);


export default onePrRouter;