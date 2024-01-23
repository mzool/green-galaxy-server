import OrderDB from "../../model/orders/order.js"
import logger from "../../services/winston_logger.js"
import formatReadableDate from "../../services/dateFormatter.js"

async function getAllUserOrders(req, res) {
    try {
        const { user } = req;
        const orders = await OrderDB.find({ email: user.email }).select(["-_id", "-__v"])
            .populate({
                path: 'items.product',
                model: 'product',
            }).lean();
        //////////////////////////////////////////
        let allOrders = [];
        for (const theOrder of orders) {
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
                });
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
                detailedStatus: theOrder.detailedStatus
            }
            allOrders.push(order)
        }

        return res.status(200).json({ success: true, allOrders, message: `you have ${allOrders.length} order ` })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default getAllUserOrders