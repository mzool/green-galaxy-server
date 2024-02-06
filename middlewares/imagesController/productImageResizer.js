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

        // Define common options for image resizing
        const resizeOptions = {
            width: 1024,
            height: 1024,
            fit: 'inside',
        };

        // Define quality option for image compression
        const compressionQuality = 80; // Adjust the value based on your preference

        // Resize and compress each image
        for (const image of images) {
            // Use try-catch block for individual image processing
            try {
                const resizedBuffer = await sharp(image.path)
                    .resize(resizeOptions)
                    .jpeg({ quality: compressionQuality, progressive: true }) // Adjust based on image format and requirements
                    .toBuffer();

                resizedImages.push({
                    originalName: image.originalname,
                    buffer: resizedBuffer,
                });
            } catch (err) {
                // Log the error and continue with other images
                logger.error(`Error processing image ${image.originalname}: ${err.message}`);
            }
        }

        // Attach the resized images to the request object
        req.resizedImages = resizedImages;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        // Handle errors at the middleware level
        logger.error(err);
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Image controller middleware failed" });
    }
}

export default resizeProductImage;
