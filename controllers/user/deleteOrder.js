import logger from "../../services/winston_logger.js";
import OrdersDB from "../../model/orders/order.js";


async function deleteUserOrderFromProfile(req, res) {
    try {
        const { orderNumber, userEmail } = req.body;
        /// get the order
        const theOrder = await OrdersDB.findOne({ email: userEmail, order_id: orderNumber })
        /// check if order status is pending
        if (theOrder.order_status !== "Pending") {
            return res.status(403).json({ success: false, message: "you can not delete order after it had been confirmed" });
        }else{
            theOrder.order_status = "Cancelled";
            await theOrder.save();
            return res.status(200).json({success:true, message:"order cancelled successfully"})
        }

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}
export default deleteUserOrderFromProfile