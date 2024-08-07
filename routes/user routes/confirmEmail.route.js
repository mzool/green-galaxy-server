import express from "express"
import confirmEmailFunc from "../../controllers/authentication/confirmEmail.conroller.js";
const confirmEmailRouter = express.Router();

confirmEmailRouter.get('/confirm-email/:token', confirmEmailFunc);
export default confirmEmailRouter