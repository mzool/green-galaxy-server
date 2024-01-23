
async function checkAdminCookie(req, res) {
    try {
        const { permesions } = req.cookies;
        if (permesions === "admin" || permesions === "superAdmin") {
            return res.status(200).json({
                success: true,
                rule:permesions,
                message: "Admin session is valid"
            })
        } else {
            res.clearCookie("permesions");
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