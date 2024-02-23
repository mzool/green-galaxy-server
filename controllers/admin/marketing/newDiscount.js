import subscribersDB from "../../../model/subscribe/subscribers.js";
import mailer from "../../../services/mailer.js";
import fs from "fs";
import path from "path";
import logger from "../../../services/winston_logger.js";

export default async function newDiscount(req, res) {
    try {
        const { body, title } = req.body;
        /// prepare the email
        const htmlPath = path.resolve("views/newDiscount.html");
        const html = fs.readFileSync(htmlPath, "utf-8").
            replace("{title}", title).
            replace("{body}", body);
        //// get all subscripers
        const subscripers = await subscribersDB.find({});
        for (const subscriber of subscripers) {
            const email = subscriber.email;
            const inputs = {
                email,
                sub: title,
                text: title,
                html
            }
            mailer(inputs)
        }
        res.status(200).json({ success: true, message: `Emails sent to ${subscripers.length} subscriper` })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
