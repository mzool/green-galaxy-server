import bcrypt from "bcrypt"
import user from '../../model/users.js'
import { generatePasetoToken } from "../../services/passeto.js";
import logger from "../../services/winston_logger.js"
import CartDb from '../../model/cart/Cart.js'
import sendEmailWithOTP from "./tow-steps-login/sendEmailWithOTP.js";


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const theUser = await user.findOne({ email: email.toLowerCase() });
        if (!theUser) {
            return res.status(401).json({ success: false, message: "wrong email or password" })
        } else {
            /// tow steps login
            const towStepsLogin = theUser.towStepsLogin;
            /// this variable check if user enter a valid password
            let theUserPassword;
            /// if user has temporary password the he initiate forget password process
            if (theUser.temporaryPassword) {
                theUserPassword = bcrypt.compareSync(password, theUser.temporaryPassword);
                theUser.temporaryPassword = null;
                await theUser.save()
            } else {
                theUserPassword = bcrypt.compareSync(password, theUser.password);
            }
            //// here, if user have one time password and use the past password to log in
            if (!theUserPassword && theUser.temporaryPassword) {
                theUserPassword = bcrypt.compareSync(password, theUser.password);
            }
            /// check if the password is correct
            if (theUserPassword) {
                //// tow steps log in here
                if (towStepsLogin) {
                    const sendOTPEmail = await sendEmailWithOTP(email);
                    if (sendOTPEmail) {
                        const token = await generatePasetoToken({ email:email.toLowerCase(), id: theUser.user_id }, 5, true);
                        return res.status(200).json({
                            success: true,
                            towStepsLogin: true, message: "OTP sent to user",
                            token
                        })
                    }
                }
                /// generate a token and get the cart for user
                const token = await generatePasetoToken({ email: email.toLowerCase(), id: theUser.user_id }, 30 * 24);
                const cart = await CartDb.findOne({ user: theUser._id });
                /// send cookies for user 
                res.cookie('user', token, {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    secure: true, // Only sends the cookie over HTTPS
                    sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
                });
                if (cart) {
                    res.cookie('cart', cart.cart_id, {
                        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                        secure: true, // Only sends the cookie over HTTPS
                        sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
                    });
                }
                ////// response
                return res.status(200).json({ success: true, message: "Logged in Successfully" });

            } else {
                return res.status(403).json({ success: false, message: "wrong email or password" })
            }

        }
    } catch (err) {
        console.log(err.message);
        logger.error(err)
        return res.status(500).json({ success: false, message: "something went wrong, please try again later." })
    }
}

export default login


/// to do : send headers with 