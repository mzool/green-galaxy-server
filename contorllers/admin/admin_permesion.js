import users from "../../model/users.js"
import sendEmail from '../../services/mailer.js'
import idGenerator from "../../services/idGenerator.js"
import logger from "../../services/winston_logger.js"
import { verifyPasetoToken } from "../../services/passeto.js"
import fs from "fs"
import cash from "../../services/redis.js"
async function adminPermesion(req, res) {
    try {
        /// get cookies
        const { cookies } = req;
        /// if no cookies 
        if (!cookies) {
            return res.status(401).json({ error: "Permission Denied" })
        } else {
            /// get the user token
            const theUser = cookies.user;
            /// if there is a token
            if (theUser) {
                /// get the payload of the token
                const publicKey = fs.readFileSync("publicKey.pem", "utf-8");
                const payLoad = await verifyPasetoToken(theUser, publicKey);
                if (payLoad.payload.user_id && payLoad.payload.email) {
                    /// query db to get the admin 
                    const _theUser = await users.findOne({ email: payLoad.payload.email, user_id: payLoad.payload.user_id });
                    if (_theUser) {
                        let admin = _theUser.isAdmin;
                        /// check permesions and confirm email
                        if (admin === "superAdmin" || admin === "admin" && _theUser.confirmEmail) {
                            /// create OTP
                            let OTP = idGenerator(5);
                            /// save otp to cash memory
                            await cash("set", _theUser.user_id, OTP);
                            const emailInputs = {
                                email: _theUser.email,
                                sub: 'One Time Password',
                                text: 'This is a one Time Password Generated For Admins at Green Galaxy Online Store:',
                                html: `<div><h2>This is a one Time Password Generated For Admins at Green Galaxy Online Store:</h2>${OTP}</div><div style=\"color: white; font-family: Arial, sans-serif;\"><h3>&copy; <span>Green Galaxy</span></h3></div>`
                            };
                            /// send email OTP
                            sendEmail(emailInputs);
                            return res.status(200).json({
                                success: true,
                                message: "admin verified successfully",
                                permessions: admin
                            })
                        } else {
                            return res.status(401).json({
                                success: false,
                                error: "permission denied",
                            })
                        }
                    } else {
                        return res.status(500).json({ error: "Permission Denied" })
                    }
                }
            } else {
                return res.status(500).json({ error: "Permission Denied" })
            }

        }
        return res.status(200).json({ permesion: "ok" })
    } catch (err) {
        logger.error(err.message)
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default adminPermesion