import logger from "../../services/winston_logger.js"
import CartDB from "../../model/cart/Cart.js";

async function deleteCartItme(req, res) {
    try {
        const { cart_id, itemId } = req.body;
        /// if no cartid or no itemid
        if (!cart_id || !itemId ) {
            return res.status(404).json({ error: "no cart id" })
        }
        /// get the cart 
        const theCart = await CartDB.findOne({ cart_id });
        /// if the cart not found
        if (!theCart) {
            return res.status(404).json({ error: "no cart found in DB" })
        }
        /// check for item in the cart
        let wantedItems = theCart.items.filter((item) => {
            if (item._id != itemId) {
                return item
            }
        })
        /// update db
        await CartDB.updateOne({ cart_id }, { $set: { "items": wantedItems } }, { new: true })
        return res.status(200).json({ success: true, message: "item removed from your cart" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default deleteCartItme