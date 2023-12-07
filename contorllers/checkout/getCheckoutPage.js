import CartDb from "../../model/cart/Cart.js";
import logger from "../../services/winston_logger.js"


async function getCheckoutPage(req, res) {
    try {
        const { cart_id } = req.params;
        if (!cart_id) {
            return res.status(404).json({ error: "cart not found" });
        }
        const theCart = await CartDb.findOne({ cart_id });
        if (!theCart) {
            return res.status(404).json({ error: "cart not found" });
        }
        return res.status(200).json({ success: true, message: "here is your cart" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, please try agian later." })
    }
}
export default getCheckoutPage
