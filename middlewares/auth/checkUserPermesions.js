import user from "../../model/users.js";
import logger from "../../services/winston_logger.js";

async function checkUserPermissions(req, res, next) {
    try {
        const { useremail } = req.headers;
        // Find the user and select isAdmin field only
        const userData = await user.findOne({ email: useremail }, { isAdmin: 1 });
        if (!userData || !userData.isAdmin || ! ["superAdmin", "admin", "user"].includes(userData.isAdmin)) {
            // If user not found or isAdmin is not defined or invalid, return an error response
            logger.info(`Error: User not found or does not have a valid type.`);
            return res
                .status(401)
                .cookie("badUser", "no access", {
                    secure: true,
                    httpOnly: true,
                    sameSite: "Strict",
                    //domain: "greenGalaxy.com", // Change to your domain
                    path: "/", // Change to your desired path
                })
                .json({ error: "User not found or invalid type." });
        }

        // Proceed to the next middleware with the user's permissions
        req.userPermissions = userData.isAdmin;
        next();
    } catch (err) {
        logger.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Something went wrong, please try again later.' });
    }
}

export default checkUserPermissions;
