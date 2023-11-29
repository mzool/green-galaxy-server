import logger from "../../services/winston_logger.js"
import subscribers from "../../model/subscribe/subscribers.js"

async function addSubscriber(req, res) {
    try {
        const { email } = req.body;
console.log(email);
        let theEmail = await subscribers.findOne({ email });
        if (theEmail) {
            return res.status(401).json({ error: "user is already subscribed !" })
        } else {
            const newEmail = new subscribers({
                email
            }).save();
            return res.status(200).json({ message: "subscribed successfully" })
        }
    } catch (err) {
        logger.info(`subscribe error: ${err.message}`)
    }
}


export default addSubscriber