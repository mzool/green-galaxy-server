import logger from '../../services/winston_logger.js'
import fs from "fs"
import idGenerator from "../../services/idGenerator.js";
import sendEmail from "../../services/mailer.js"
import cash from '../../services/redis.js';
import path from 'path';


async function sendOtp(req, res) {
    try {
        const { user } = req;
        /// no user cookie
        if (!user) { return res.status(401).json({ success: false, message: "user not found" }) }

        //// if he is admin
        if (user.isAdmin === "admin" || user.isAdmin === "superAdmin") {
            const otp = idGenerator(5);
            cash("set", user.user_id, otp);
            /// get html file
            const htmlPath = path.resolve("views/OTPEmail.html");
            const html = fs.readFileSync(htmlPath, 'utf-8').replace("{$OTP$}", otp);
            //// email 
            const emailInputs = {
                email: user.email,
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