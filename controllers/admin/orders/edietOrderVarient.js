import logger from "../../../services/winston_logger.js";
import OrdersDB from "../../../model/orders/order.js";
import ProductDB from "../../../model/products/product.js";

async function updateOrderVarient(req, res) {
    try {
        let { order_id, itemId, color, size, quantity, otherVarients } = req.body;
        quantity = Number(quantity);
        /// get the order
        const theOrder = await OrdersDB.findOne({ order_id, items: { $elemMatch: { _id: itemId } } });
        if (!theOrder) { return res.status(404).json({ success: false, message: "order not found in data base" }) }
        /// loop throug the items product and get the wanted item 
        for (const item of theOrder.items) {
            if (String(item._id) == itemId) {
                color ? item.color = color : null;
                size ? item.size = size : null;
                otherVarients ? item.otherVarients = otherVarients : null;
                if (quantity != item.quantity) {
                    const theProdcut = await ProductDB.findOne({ _id: item.product });
                    if (quantity > item.quantity) {
                        theProdcut.productStock = theProdcut.productStock - (quantity - item.quantity);
                        theOrder.totalPrice = theOrder.totalPrice +
                            (theProdcut.productPrice * (1 - theProdcut.productDiscount / 100)) * (quantity - item.quantity);
                    } else if (quantity < item.quantity) {
                        theProdcut.productStock = theProdcut.productStock + (item.quantity - quantity);
                        theOrder.totalPrice = theOrder.totalPrice -
                            (theProdcut.productPrice * (1 - item.discount / 100)) * (item.quantity - quantity);

                    }
                    item.quantity = quantity;
                    await theOrder.save();
                    await theProdcut.save()
                }
            }
        };
        await theOrder.save();
        return res.status(200).json({ success: true, message: "item varients updated successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
export default updateOrderVarient