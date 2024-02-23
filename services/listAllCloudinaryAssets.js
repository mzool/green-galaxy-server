import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
// import fs from "fs"
// import logger from "../services/winston_logger.js"
dotenv.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret,
});
export default async function listAllAssets(prefix = ["Green_Galaxy/users_profiles", "Green_Galaxy/products", "blogs"]) {
    try {
        let data = [];
        for (const pre of prefix) {
            await cloudinary.api
                .resources(
                    {
                        type: 'upload',
                        prefix: pre
                    })
                .then(result => {
                    data.push(result.resources)
                });
        }
        return data
    } catch (err) {
        console.log(err);
        return
    }
}