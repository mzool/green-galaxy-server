import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import logger from "../../services/winston_logger.js";
import user from "../../model/users.js"
function googleRegister() {
    try {
        /// create google strategy
        passport.use(new GoogleStrategy({
            clientID: process.env.google_cloud_id,
            clientSecret: process.env.google_cloud_secret,
            callbackURL: "http://localhost:3000/api/auth/google"
        },
            async function (accessToken, refreshToken, profile, cb) {
                const user_id = profile.id;
                const email = profile.email;
                const name = profile.displayName;
                (await user.create({user_id, email, username:name})).save()
                return cb(null, profile);
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));
        // return res.status(200).json({ success: true, message: "google registration" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        // return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default googleRegister