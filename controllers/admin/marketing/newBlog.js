import sendEmail from "../../../services/mailer.js";
import subscribers from "../../../model/subscribe/subscribers.js";
import path from "path";
import fs from "fs";
import logger from "../../../services/winston_logger.js";

export default async function newBlogAnnouncement(req, res) {
    try {
        const { title, summary, blog_id } = req.body;
        // get all subscribers
        const allSubscribers = await subscribers.find({}).lean();
        if (allSubscribers.length == 0) {
            return res.status(404).json({ success: true, message: "no subscribers untill now!" })
        }
        /// get html file
        const htmlPath = path.resolve("views/newBlogAnnouncement.html");
        const html = fs.readFileSync(htmlPath, "utf-8").
            replace("{title}", title).
            replace("{summary}", summary).
            replace("{blog_id}", blog_id);
        /// email inputs
        const inputs = {
            sub: 'Exciting News Alert! Our Latest Blog Post is Live!',
            text: 'Exciting News Alert! Our Latest Blog Post is Live!',
            html
        }
        try {
            for (const user of allSubscribers) {
                inputs.email = user.email;
                sendEmail(inputs)
            }
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message })
        }
        return res.status(200).json({
            success: true,
            message: `New Blog announcements had been sent to ${allSubscribers.length} subscribers.`
        })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
