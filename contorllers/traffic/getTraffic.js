import util from "util"


async function traffic(req, res, next) {
    try {
        console.log(util.inspect(req));
        next()
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error" })
    }
}
export default traffic