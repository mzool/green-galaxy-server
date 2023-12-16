import logger from "../../services/winston_logger.js";
import OrdersDB from "../../model/orders/order.js"
import product from "../../model/products/product.js"

async function trackOrder(req, res) {
    try {
        const { orderNumber } = req.body;
        const theOrder = await OrdersDB.findOne({ order_id: orderNumber }).select(["-_id", "-__v", "-updatedAt", "-createdAt", "-order_id"]).lean();
        if (!theOrder) {
            return res.status(404).json({ success: false, message: "no order found!" })
        }
        /// all items contains products ids and quantity
        const allItems = theOrder.items.map((item) => {
            return [item.product_id, item.quantity];
        });
        //// get products ids
        const ids = allItems.map((item)=>{return item[0]});
        /// get all products in order
        const theProducts = await product.find({ productId: { $in: ids } }).select(["-_id", "-__v", "-updatedAt", "-createdAt", "-order_id"]).lean();
       /// confifure what items info to return to user
        const items = theProducts.map((item, index) => {
            return {name:item.productName, brand:item.productBrand, price:item.productPrice, image:item.productImgs[0], quantity:allItems[index][1] }
        });
        /// final order to res to user
        const order = {
            order_status: theOrder.order_status,
            orderNumber,
            fullName: `${theOrder.firstName} ${theOrder.lastName}`,
            address: `${theOrder.city} / ${theOrder.address} `,
            totalPrice: theOrder.totalPrice,
            paid: theOrder.paid,
            payment_method: theOrder.payment_method,
            phone_number: theOrder.phone,
            items
        };
        return res.status(200).json({ success: true, order })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later" })
    }
}

export default trackOrder