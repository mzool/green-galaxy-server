import ReturnsDB from "../../../model/returns/returnsDB.js";
import logger from "../../../services/winston_logger.js"

async function deleteReturn(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: "require return id" })
        }

        const re = await ReturnsDB.findOne({ id });
        if (!re) {
            return res.status(404).json({ success: false, message: "return not found" })
        }
        await ReturnsDB.deleteOne({ id });
        return res.status(200).json({ success: true, message: "return deleted successfully" })

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default deleteReturn