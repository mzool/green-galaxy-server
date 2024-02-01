import logger from "../../services/winston_logger.js";
import sendEmail from "../../services/mailer.js";
import fs from "fs";
import path from "path";
import { generatePasetoToken } from "../../services/passeto.js";

async function reSendConfirmationEmail(req, res) {
    try {
        /// get user
        const { user } = req;
        /// get html file
        const htmlFilePath = path.resolve("views/sendConfirmEmailMessage.html");
        /// generate token
        const confirmEmailToken = await generatePasetoToken({ email: user.email, id: user.user_id }, 1);
        /// send confirmation email 
        const url = `${req.protocol}://${req.headers.host}${process.env.apiurl}/confirm-email/${confirmEmailToken}`
        const htmlFile = fs.readFileSync(htmlFilePath, "utf-8").replace("{$link$}", url);
        const emailInputs = {
            email:user.email,
            sub: 'Confirm your Email',
            text: 'Please confirm your email address',
            html: htmlFile
        };
        sendEmail(emailInputs);

        return res.status(200).json({ status: "success" })


    } catch (err) {
        logger.error(err);
        console.log(err);
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default reSendConfirmationEmail