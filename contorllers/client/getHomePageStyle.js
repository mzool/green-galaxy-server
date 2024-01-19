import HomePageStyleDB from "../../model/client/homePage.js";
import logger from "../../services/winston_logger.js"

async function getHomeStyle(req, res) {
    try {
        const style = await HomePageStyleDB.find({});
        if (style) {
            return res.status(200).json({ success: true, style })
        } else {
            return res.status(400).json({ success: false, message: "error while getting data" })
        }
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something error, try again later" })
    }
}

export default getHomeStyle