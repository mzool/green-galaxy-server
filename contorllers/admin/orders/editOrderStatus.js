import logger from "../../../services/winston_logger.js";
import OrdersDB from "../../../model/orders/order.js";


async function editOrderStatus(req, res) {
    try {
        const { order_id, orderStatus, details } = req.body;
        console.log(order_id, orderStatus, details);
        /// get the order
        const theOrder = await OrdersDB.findOne({ order_id });
        if (!theOrder) { return res.status(404).json({ success: false, message: "order not found in data base" }) };
        /// update order status
        theOrder.order_status = orderStatus;
        details ? theOrder.detailedStatus = details : null;
        await theOrder.save();
        return res.status(200).json({ success: true, message: "order status updated successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
export default editOrderStatus