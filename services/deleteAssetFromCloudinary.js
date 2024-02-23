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

const deleteAssetFromCloudinary = async (public_id) => { /// public_id or path
    try {
        await cloudinary.uploader.destroy(public_id).
            then((res) => {
                console.log(res);
            }).catch(err => console.log(err))

    } catch (err) {
        console.log(err.message);
        logger.error(err)
        return
    }
};
export default deleteAssetFromCloudinary
