import dotenv from "dotenv";
import axios from "axios";
import logger from "../../services/winston_logger.js";
import VisitorsLocations from "../../model/data-analysis/visitorsLocations.js";
import UserDB from "../../model/users.js";
import { verifyPasetoToken } from "../../services/passeto.js";
import path from "path";
import fs from "fs";
// Load environment variables from .env file
dotenv.config();

async function trackLocation(req, res, next) {
    try {
        /// check if user have a location cookie then next else get location
        const { userCountry, user } = req.cookies;
        if (userCountry) {
            return next()
        }
        const ip = req.ip;
        const token = process.env.ipinfo_token;
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${token}`);
        /// send cookie
        res.cookie('userCountry', `${response.data.country}`, {
            maxAge: 365 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: true, // Only sends the cookie over HTTPS
            sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
        });
        if (user) {
            const keyPath = path.resolve("publicKey.pem");
            const key = fs.readFileSync(keyPath);
            const payload = await verifyPasetoToken(user, key);
            const theUser = await UserDB.findOne({ user_id: payload.payload.id });
            theUser.userCountry = response.data.country;
            await theUser.save();
        }
        /// save to db
        const location = await new VisitorsLocations(response.data);
        await location.save()
        next();
    } catch (err) {
        console.error("Error in trackLocation:", err.message);
        logger.error(err);
        next();
    }
}

export default trackLocation;
