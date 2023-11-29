import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs"
import logger from "../services/winston_logger.js"
dotenv.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret,
});

const uploadPhoto = async (image, path) => {
    try {
        let urls = []
        for (let i = 0; i < image.length; i++) {
            const photoURL = await cloudinary.uploader.upload(image[i].path, { folder: path })
            urls.push(photoURL.secure_url)

            fs.unlink(image[i].path, (err) => {
                if (err) {
                    console.log(err);
                    logger.error(`error: ${err}`)
                    return
                }
            })
        }
        return urls
    } catch (err) {
        logger.error(`error: ${err}`)
        return
    }
};
export default uploadPhoto
