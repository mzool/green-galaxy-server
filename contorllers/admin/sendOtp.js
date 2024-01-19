import logger from '../../services/winston_logger.js'
import userDB from "../../model/users.js"
import fs from "fs"
import { join } from 'path';
import { fileURLToPath } from 'url';
import { verifyPasetoToken } from '../../services/passeto.js';
import idGenerator from "../../services/idGenerator.js";
import sendEmail from "../../services/mailer.js"
import cash from '../../services/redis.js';
async function sendOtp(req, res) {
    try {
        const { user } = req.cookies;
        /// no user cookie
        if (!user) { return res.status(401).json({ success: false, message: "user token not found" }) }
        //// verify cookie
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = join(__filename, '..'); // Assuming you want the directory containing the current module
        const publicKeyPath = join(__dirname, "../../publicKey.pem");
        const key = fs.readFileSync(publicKeyPath);
        //// get the payload from cookie
        const payload = await verifyPasetoToken(user, key);
        const theUser = await userDB.findOne({ user_id: payload.payload.user_id });
        if (!theUser) {
            return res.status(401).json({ success: false, message: "session expired" })
        }
        //// if he is admin
        if (theUser.isAdmin === "admin" || theUser.isAdmin === "superAdmin") {
            const otp = idGenerator(5);
            cash("set", theUser.user_id, otp);
            /// get html file
            const htmlPath = fileURLToPath(import.meta.url);
            const htmlFile = join(htmlPath, "../../../views/OTPEmail.html");
            const html = fs.readFileSync(htmlFile, 'utf-8').replace("${OTP}", otp)
            //// email 
            const emailInputs = {
                email:theUser.email,
                sub: 'One Time Password',
                text: 'Please Enter this one time password in order to access admin page of Green Galaxy',
                html
            };
            sendEmail(emailInputs);
            return res.status(200).json({ success: true, message: "OTP sent Successfully" })

        } else {
            return res.status(401).json({ success: false, message: "you can not access admin page" })
        }
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}

export default sendOtp