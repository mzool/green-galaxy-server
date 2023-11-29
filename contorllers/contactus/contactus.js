import logger from "../../services/winston_logger.js";
import ContactUsMsgs from "../../model/user interactions/contactUsMsgs.js";
import idGenerator from '../../services/idGenerator.js'

async function contactUs(req, res) {
    try {
        console.log(req.body);
        const { name, email, phone, message } = req.body;
        const message_id = idGenerator(10)
        await ContactUsMsgs({
            message_id,
            sender_name: name,
            sender_email: email,
            sender_phone: phone,
            message
        }).save();
        res.status(200).json({ message: "Thank you for your message, we will contact you as soon as possible." })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again latar." })
    }
}

export default contactUs