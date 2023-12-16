import express from "express"
import authrizeReq from "../../middlewares/auth/API_authorization.js"
import search from "../../contorllers/search/search.js"
import searchSchema from "../../middlewares/search/searchSchem.js";
import validateFunc from "../../middlewares/validation/validationFunction.js"

const searchRouter = express.Router();
searchRouter.post("/search", authrizeReq, validateFunc(searchSchema), search);

export default searchRouter