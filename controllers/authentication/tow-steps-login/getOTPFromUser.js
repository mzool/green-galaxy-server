import logger from "../../../services/winston_logger.js";
import cash from "../../../services/redis.js"
import UserDB from "../../../model/users.js"
import CartDB from "../../../model/cart/Cart.js";
import { generatePasetoToken } from "../../../services/passeto.js";

async function getOTPFromUser(req, res) {
    try {
        const { otp } = req.body;
        const { user } = req;
        /// validate otp  because no validation middleware
        if (!Number(otp)) {
            return res.status(404).json({ success: false, message: "Invalid password, try again" })
        }
        /// get the cached otp
        const cashedOTP = await cash("get", user.email);

        if (!cashedOTP) {
            return res.status(401).json({ success: false, message: "Invalid token, go to login page to initiate a new one" })
        }
        /// check if the cached otp equal the provided otp
        if (Number(otp) === Number(cashedOTP)) {
            await cash("del", user.email);
            /// generate a token and get the cart for user
            const theUser = await UserDB.findOne({ user_id: user.id, email: user.email });
            if (!theUser) {
                return res.status(404).json({ success: false, message: "user not found" })

            }
            const token = await generatePasetoToken({ email: user.email, id: user.id }, 30 * 24);
            const cart = await CartDB.findOne({ user: theUser._id });

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
            return res.status(200).json({ success: true, message: "verified successfully" })

        } else {
            return res.status(401).json({ success: false, message: "wrong password" })

        }

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error, try agian later" })
    }
}

export default getOTPFromUser