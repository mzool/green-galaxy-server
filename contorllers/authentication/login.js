import bcrypt from "bcrypt"
import user from '../../model/users.js'
import { generatePasetoToken } from "../../services/passeto.js";
import logger from "../../services/winston_logger.js"
import CartDb from '../../model/cart/Cart.js'
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const theUser = await user.findOne({ email });
        if (!theUser) {
            return res.status(401).json({ error: "We couldn't find the email address you provided in our system. Please make sure you've registered or go to the registration page to create an account." })
        } else {
            const theUserPassword = bcrypt.compareSync(password, theUser.password);
            if (theUserPassword) {
                const token = await generatePasetoToken({ email, user_id: theUser.user_id }, 30 * 24);
                const cart = await CartDb.findOne({user:theUser._id})
                res.cookie('user', token, {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    secure: true, // Only sends the cookie over HTTPS
                    sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
                });
                if (cart){
                res.cookie('cart', cart.cart_id, {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    secure: true, // Only sends the cookie over HTTPS
                    sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
                });
            }

                return res.status(200).json({ success: true, message: "Logged in Successfully" });

            } else {
                return res.status(403).json({success:false, message: "wrong email or password" })
            }

        }
    } catch (err) {
        console.log(err.message);
        logger.error(err)
        return res.status(500).json({ error: "something went wrong, please try again later." })
    }
}

export default login


/// to do : send headers with 