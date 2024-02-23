import logger from "../../services/winston_logger.js";
import ContactUsMsgs from "../../model/user interactions/contactUsMsgs.js";
import idGenerator from '../../services/idGenerator.js'
import sendEmail from "../../services/mailer.js"
import path from "path"
import fs from "fs"


async function contactUs(req, res) {
    try {
        const { name, email, phone, message } = req.body;
        const message_id = idGenerator(10)
        await ContactUsMsgs({
            message_id,
            sender_name: name,
            sender_email: email,
            sender_phone: phone,
            message
        }).save();
        /// send email
        /// get html file
        const htmlPath = path.resolve("views/userContactUs.html");
        const html = fs.readFileSync(htmlPath, "utf-8").replace("{$name}", name)
            .replace("{$email}", email)
            .replace("{$phone}", phone)
            .replace("{$msg}", message)

        sendEmail({
            email: "support@green-galaxy.net", // Recipient's email address
            sub: "contact us form",
            text: "message from user",
            html
        })
        res.status(200).json({ message: "Thank you for your message, we will contact you as soon as possible." })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again latar." })
    }
}

export default contactUs