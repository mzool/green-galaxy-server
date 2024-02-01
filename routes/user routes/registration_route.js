import express from "express"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import registerSchema from "../../middlewares/validation/registerValidation.js"
import registerNewUser from "../../contorllers/authentication/register.js"
import googleRegister from "../../contorllers/authentication/googleRegister.js"
import passport from "passport"
import dotenv from "dotenv"
dotenv.config()
const registerRouter = express.Router()

registerRouter.post('/register/new/user', validateRequest(registerSchema), registerNewUser);

//// google registeration
// registerRouter.get("/register/google",
//     (req, res, next) => {
//         googleRegister();
//         next();
//     },
//     async (req, res, next) => {

//         await passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })(req, res, next);

//     },
//     (req, res) => {
//         return res.status(200).json({ success: true});
//     }

// );

// /// google callback route
// registerRouter.get("/auth/google", (req, res) => {
//     passport.authenticate('google', {
//         successRedirect: "http://localhost:5173/profile",
//         failureRedirect: "http://localhost:5173/register"
//     })
//     res.json({ message: "success" })
//     return console.log(req.user);
// })


////
export default registerRouter