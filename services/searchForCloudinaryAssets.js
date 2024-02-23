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

export default async function searchOnCloudinary() {
    const allFiles = await cloudinary.search.max_results(1000).execute()
    //  .then(result => console.log(result));
    return allFiles
}



cloudinary.v2.search
    .expression('resource_type:image AND tags=shirt AND uploaded_at>1d AND bytes>1m')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute()
    .then(result => console.log(result));