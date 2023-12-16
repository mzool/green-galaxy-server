import logger from "../../services/winston_logger.js"

async function Theme(req, res) {
    try {

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default Theme