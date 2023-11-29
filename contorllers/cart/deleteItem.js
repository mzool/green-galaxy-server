import logger from "../../services/winston_logger.js"
import CartDB from "../../model/cart/Cart.js";

async function deleteCartItme(req, res) {
    try {
        const { itemid, cartid } = req.headers;
        /// if no cartid or no itemid
        if (!cartid || !itemid) {
            return res.status(404).json({ error: "no cart id" })
        }
        /// get the cart 
        const theCart = await CartDB.findOne({ cart_id: cartid });
        /// if the cart not found
        if (!theCart) {
            return res.status(404).json({ error: "no cart found in DB" })

        }
        /// check for item in the cart
        let theItem = theCart.item.filter((itm) => {
            if (itm.itemId != itemid) {
                return itm
            }
        })
        /// update db
        await CartDB.updateOne({ cart_id: cartid, "item.itemId": itemid }, { $set: { "item": theItem } }, { new: true })
        return res.status(200).json({ success: true, message: "item removed from your cart" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default deleteCartItme