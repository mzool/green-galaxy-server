import logger from "../../services/winston_logger.js";
import sendEmail from "../../services/mailer.js";
import { generatePasetoToken, verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs";
async function reSendConfirmationEmail(req, res) {
    try {
        const token = req.cookies.user;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized!" })
        } else {
            let publicKey = fs.readFileSync("publicKey.pem");
            let userData = await verifyPasetoToken(token, publicKey);
            const email = userData.payload.email;
            const user_id = userData.payload.user_id;
            /// send confirmation email 
            const confirmEmailToken = await generatePasetoToken({ email, id: user_id }, 1);
            const url = `${req.protocol}://${req.headers.host}${process.env.apiurl}/confirm-email/${confirmEmailToken}`
            const emailInputs = {
                email,
                sub: 'Confirm your Email',
                text: 'Please confirm your email address by clicking the button below:',
                html: `<div><h2>Please confirm your email address by clicking the link below:</h2><a href=${url} style=\"background-color: green; color: white; padding: 10px 20px; text-decoration: none; border: none; cursor: pointer; display: inline-block;\">Confirm Your Email</a></div><div style=\"color: white; font-family: Arial, sans-serif;\"><h3>&copy; <span>Green Galaxy</span></h3></div>`
            };
            sendEmail(emailInputs);

            return res.status(200).json({status:"success"})
        }

    } catch (err) {
        logger.error(err);
        console.log(err);
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default reSendConfirmationEmail