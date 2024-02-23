import fs from "fs"
import path from "path"
import logger from "../../../services/winston_logger.js";
import sendEmail from "../../../services/mailer.js";
import idGenerator from "../../../services/idGenerator.js";
import cash from "../../../services/redis.js";

async function sendEmailWithOTP(email) {
    try {
        /// generate random numbers
        const otp = idGenerator(5);
        /// set the otp to cash
        cash("set", email.toLowerCase(), otp, 5);
        /// get the html file
        const htmlFilePath = path.resolve("views/OTPEmail.html");
        const html = fs.readFileSync(htmlFilePath, "utf-8").replace("{$OTP$}", otp);
        const inputs = {
            email, // Recipient's email address
            sub: "Tow steps login process",
            text: "Use the provide one time password to login you your account",
            html: html,
        }
        sendEmail(inputs);
        return true
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        throw new Error(err.message)
    }
}
export default sendEmailWithOTP