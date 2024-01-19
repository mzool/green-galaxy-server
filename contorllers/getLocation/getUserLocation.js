import logger from "../../services/winston_logger.js";
import axios from "axios";

async function getLocation(req, res) {
    try {
        const ip = req.socket.remoteAddress;
        const info = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.ipStack_api_key}`);
        //console.log(info);
       return res.status(200).json({ success: true, message: "location optain successfully" })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default getLocation