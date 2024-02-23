import ContactUsMsgs from "../../../model/user interactions/contactUsMsgs.js";
import logger from "../../../services/winston_logger.js"

async function getContactMsgs(req, res) {
    try {
       const messages = await ContactUsMsgs.find({});
       return res.status(200).json({success:true, messages})
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}

export default getContactMsgs