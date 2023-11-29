import getOneProduct from "../../contorllers/products/getOneProduct.js"
import express from "express"

const onePrRouter = express.Router();

onePrRouter.get("/get-product", getOneProduct);


export default onePrRouter;