import OpenAI from 'openai';
import logger from '../../../services/winston_logger.js'
import dotenv from "dotenv"

dotenv.config();
const configuration = {
    apiKey: process.env.openAISecretKey,
};
const openai = new OpenAI(configuration);
async function createImage(req, res) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
        });
        const photo = response.data.data[0].url;
        return res.status(200).json({ success: true, photo })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}

export default createImage;
