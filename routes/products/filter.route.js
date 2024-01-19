import express from 'express'
import filterProducts from '../../contorllers/products/filter.controller.js'
import validateRequest from "../../middlewares/validation/validationFunction.js"
import filterSchema from '../../middlewares/validation/products/filterValidation.js'
import authorizeReq from "../../middlewares/auth/API_authorization.js"
/// router
const filterRouter = express.Router()

filterRouter.post("/filter-products", authorizeReq, filterProducts);

export default filterRouter