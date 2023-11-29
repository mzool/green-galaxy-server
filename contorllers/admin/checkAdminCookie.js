
async function checkAdminCookie(req, res) {
    try {
        const { permesions } = req.cookies;
        if (permesions && permesions === "Admin") {
            return res.status(200).json({
                success: true,
                message: "Admin session is valid"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: " Admin session not valid"
            })
        }
    } catch (err) {
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default checkAdminCookie