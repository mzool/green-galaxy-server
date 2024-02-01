import loginRouter from "./login.js";
import registerRouter from './registration_route.js'
import confirmEmailRouter from "./confirmEmail.route.js";
import logoutRouter from "../auth routes/logout.route.js";
import contactUsRouter from "./contactUs.router.js";
import forgetPasswordRouter from "./forgetPasswordRouter.js";
import changePasswordRouter from "./changePasswordRouter.js";
import getAllOrderRouter from "./getAllOrders.js";
import cancellOrderRouter from "./deleteOrder.Router.js";
import enableTowStepsLoginRouter from "./enableTowStepLogin.js";
import checkForOtpTokenRouter from "./tow-steps-login/checkForUserToken.router.js";
import getOTPFromUserRouter from "./tow-steps-login/getOtpFromUser.router.js";

export {loginRouter, registerRouter, confirmEmailRouter, logoutRouter,
     contactUsRouter, forgetPasswordRouter, changePasswordRouter, getAllOrderRouter,
     cancellOrderRouter, enableTowStepsLoginRouter, checkForOtpTokenRouter,
     getOTPFromUserRouter
    }