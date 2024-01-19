import sharp from "sharp";
import logger from "../../services/winston_logger.js";

async function resizeProductImage(req, res, next) {
    try {
        const images = Object.values(req.files);

        // Ensure that images exist in the request
        if (!images || !Array.isArray(images)) {
            return res.status(400).json({ success: false, message: "No images provided in the request" });
        }

        // Array to store resized images
        const resizedImages = [];

        // Resize each image
        for (const image of images) {
            const resizedBuffer = await sharp(image.path)
                .resize({ width: 1024, height: 1024, fit: 'inside' }) // Adjust the dimensions as needed
                .toBuffer();

            resizedImages.push({
                originalName: image.originalname,
                buffer: resizedBuffer,
            });
        }

        // Attach the resized images to the request object
        req.resizedImages = resizedImages;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        logger.error(err);
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Image controller middleware failed" });
    }
}

export default resizeProductImage;
