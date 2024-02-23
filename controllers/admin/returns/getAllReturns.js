import ReturnsDB from "../../../model/returns/returnsDB.js";
import logger from "../../../services/winston_logger.js"

async function getAllReturns(req, res) {
    try {
        const allReturns = await ReturnsDB.find({});
        return res.status(200).json({ success: true, allReturns })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default getAllReturns