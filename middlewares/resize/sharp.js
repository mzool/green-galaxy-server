import sharp from "sharp";
import logger from "../../services/winston_logger.js"

async function resizeImgs(req, res, next) {
    try {
        console.log(req.file);
        sharp(req.file.buffer)
            .resize(parseInt(1000), parseInt(1000))
            .toBuffer()
            .then((data) => {
                // Replace the original buffer with the resized image
                req.file.buffer = data;
                console.log(req.file);
                next();
            })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "something error, try again later" })
    }
}
export default resizeImgs