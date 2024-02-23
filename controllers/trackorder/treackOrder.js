import logger from "../../services/winston_logger.js";
import OrdersDB from "../../model/orders/order.js"
import formatReadableDate from "../../services/dateFormatter.js";
async function trackOrder(req, res) {
    try {
        const { orderNumber, email } = req.body;
        if (!orderNumber || !email) {
            return res.status(401).json({ success: false, message: "order number and email are required" })
        }
        const theOrder = await OrdersDB.findOne({ order_id: orderNumber, email }).select(["-_id", "-__v"])
            .populate({
                path: 'items.product',
                model: 'product',
            }).lean();
        if (!theOrder) {
            return res.status(404).json({ success: false, message: "no order found!" })
        }
        //// order data to send
        let items = [];
        for (const item of theOrder.items) {
            items.push({
                name: item.product.productName,
                id: item.product.productId,
                image: item.product.productImgs[0],
                price: item.product.productPrice,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                varient: item.otherVarients,
                discount: item.discount || 0
            })
        }
        const order = {
            userName: `${theOrder.firstName} ${theOrder.lastName}`,
            userEmail: theOrder.email,
            phoneNumber: theOrder.phone,
            fullAddress: `${theOrder.city} / ${theOrder.address}`,
            items,
            orderNumber: theOrder.order_id,
            placedAt: formatReadableDate(theOrder.createdAt),
            total: theOrder.totalPrice,
            paymentMethod: theOrder.payment_method,
            status: theOrder.order_status,
            detailedStatus:theOrder.detailedStatus
        }
        return res.status(200).json({ success: true, order })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later" })
    }
}

export default trackOrder