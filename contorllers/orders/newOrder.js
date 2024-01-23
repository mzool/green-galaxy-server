import OrdersDb from "../../model/orders/order.js";
import logger from "../../services/winston_logger.js";
import idGenerator from "../../services/idGenerator.js"
import CartDb from "../../model/cart/Cart.js"
import ProductDB from '../../model/products/product.js'
async function newOrder(req, res) {
    try {
        const { firstName, lastName, phone, email, address, city, items, payment_method, totalPrice, cartId } = req.body;
        let order_id = idGenerator(6, false, false, false, true);
        let checkOrderId = await OrdersDb.find({ order_id });
        let checker = false;
        while (checker == false) {
            checker = true;
            if (checkOrderId.length > 0) {
                order_id = idGenerator(6, false, false, false, true);
                checkOrderId = await OrdersDb.find({ order_id });
                checker = false;
            }
        }
        //// populate the product
        let finalPrice = 0;
        for (const item of items) {
            const product = await ProductDB.find({ productId: item.productId }).lean();
            item.product = product[0]._id;
            item.discount = product[0].productDiscount;
            finalPrice = finalPrice + product[0].productPrice * (1 - product[0].productDiscount / 100)
            await ProductDB.updateOne({ productId: item.productId }, { productStock: product[0].productStock - 1 }, { new: true });
            delete item["productId"]
        };
        const tax  = .16;
        const delivery = 5;
        finalPrice = finalPrice + finalPrice* tax + delivery;

        const newOrder = await new OrdersDb({
            order_id,
            firstName,
            lastName,
            phone,
            email,
            address,
            items,
            city,
            payment_method,
            totalPrice:finalPrice
        }).save();
        /// update products stock
        /// clear cart cookie
        res.clearCookie(`cart`);
        /// delete cart from DB
        await CartDb.deleteOne({ cart_id: cartId });
        /// send email with reciept to user 
        return res.status(200).json({ success: true, orderNumber: order_id, message: `Thank you for trust Green Galaxy, you can track your order using this order number ${order_id}` })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Somthing Error, try again later." })
    }
}

export default newOrder