import logger from "../../services/winston_logger.js"
import subscribers from "../../model/subscribe/subscribers.js"

async function addSubscriber(req, res) {
    try {
        const { email } = req.body;
        let theEmail = await subscribers.findOne({ email });
        if (theEmail) {
            return res.status(200).json({ success: true, message: "subscribed" })
        } else {
            const newEmail = new subscribers({
                email
            }).save();
            return res.status(200).json({ success: true, message: "subscribed successfully" })
        }
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}


export default addSubscriber