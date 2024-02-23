import logger from "../../../services/winston_logger.js";
import OrdersDB from "../../../model/orders/order.js";


async function deleteItemFromOrder(req, res) {
    try {
        const { order_id, itemId } = req.body;
        /// get the order

        const theOrder = await OrdersDB.findOne({ order_id, items: { $elemMatch: { _id: itemId } } }).populate({
            path: "items.product",
            model: "product"
        });
        if (!theOrder) { return res.status(404).json({ success: false, message: "order not found in data base" }) };
        if (theOrder.items.length == 1) {
            return res.status(403).json({ success: false, message: "order has one item, update order status to cancelled" })
        }
        /// loop throug the items product and get the wanted item to delete
        let newPrice = 0;
        let newItems = theOrder.items.filter((item) => {
            if (String(item._id) != itemId) {
                return item
            } else {
                newPrice = newPrice + item.product.productPrice * (1 - item.discount / 100);

            }
        });
        theOrder.totalPrice = theOrder.totalPrice - newPrice;
        theOrder.items = newItems;
        await theOrder.save();
        return res.status(200).json({ success: true, message: "item deleted successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
export default deleteItemFromOrder