import OrdersDb from "../../model/orders/order.js";
import logger from "../../services/winston_logger.js";
import idGenerator from "../../services/idGenerator.js"
import CartDb from "../../model/cart/Cart.js"
async function newOrder(req, res) {
    try {
        const { firstName, lastName, phone, email, address, city, items, cart_id, payment_method, totalPrice } = req.body;
        const order_id = idGenerator(6, false, false, false, true);
        const allOrders = await OrdersDb.find({});
        let checker = false;
        while (checker == false) {
            checker = true;
            allOrders.forEach((order) => {
                if (order.order_id == order_id) checker = false
            })
        }
        const newOrder = await new OrdersDb({
            order_id,
            firstName,
            lastName,
            phone,
            email,
            address,
            items,
            city,
            cart_id,
            payment_method,
            totalPrice
        }).save();
        /// clear cart cookie
        res.clearCookie(`green_G_cart_${cart_id}`);
        /// delete cart from DB
        await CartDb.deleteOne({ cart_id });
        return res.status(200).json({ success: true, orderNumber: order_id, message: `Thank you for trust Green Galaxy, you can track your order using this order number ${order_id}` })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Somthing Error, try again later." })
    }
}

export default newOrder