////// delete cart if it is empty
import CartDB from "../../model/cart/Cart.js";
import logger from "../../services/winston_logger.js";
import getCookie from "../../services/getThCookie.js";
async function deleteCart(req, res) {
    try {
        const { method } = req.body;
        const cookies = req.headers.cookie;
        const cart_id = getCookie(cookies, "green_G_cart_", true);
        if (!cart_id || !method) {
            return res.status(404).json({ error: "no cart or method found" })
        } else {
            if (method == "cookie") {
                res.clearCookie("user")
                res.clearCookie(`green_G_cart_${cart_id}`);
                return res.status(200).json({ success: true })
            } else {
                res.clearCookie(cart_id);
                await CartDB.deleteOne({ cart_id }).save();
                return res.status(200).json({ success: true, message: "cart deleted successfully" })
            }
        }
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default deleteCart