async function addAuthHeaderShellOne(req, res, next) {
    try {
        if (req.hostname === process.env.hostname) {
            req.headers["shellOne"] = `${"GreenBearer"} ${process.env.authorization_token}`
        }
        next()
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later" })
    }
}
export default addAuthHeaderShellOne