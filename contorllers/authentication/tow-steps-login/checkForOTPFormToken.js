import logger from "../../../services/winston_logger.js";
import path from "path"
import fs from "fs"
import { verifyPasetoToken } from "../../../services/passeto.js";


async function checkForOtpToken(req, res, next) {
    try {
        /// get the token on the login/otp-form?token=
        const { token } = req.query;
        if (!token) {
            return res.status(404).json({ success: false, message: "required token" })
        }
        /// verify token
        /// get publick key
        const publickKeyPath = path.resolve("publicKey.pem");
        const publicKey = fs.readFileSync(publickKeyPath);
        /// get payload
        const payload = await verifyPasetoToken(token, publicKey);
        if (!payload) {
            return res.status(401).json({ success: false, message: "token expired, go to login page to initiate a new one" })

        } else {
            if (next) {
                req.user = {
                    id: payload.payload.id,
                    email: payload.payload.email
                }
                return next()
            } else {
                return res.status(200).json({ success: true })

            }
        }

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default checkForOtpToken