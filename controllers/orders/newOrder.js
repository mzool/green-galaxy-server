import OrdersDb from "../../model/orders/order.js";
import logger from "../../services/winston_logger.js";
import idGenerator from "../../services/idGenerator.js"
import CartDb from "../../model/cart/Cart.js"
import ProductDB from '../../model/products/product.js'
import sendEmail from "../../services/mailer.js"
import path from "path"
import fs from "fs"

async function newOrder(req, res) {
    try {
        const { firstName, lastName, phone, email, address, city, items, payment_method, cartId } = req.body;
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
            const product = await ProductDB.findOne({ productId: item.productId }).lean();
            if (product.productStock < item.quantity) {
                res.clearCookie("cart");
                /// delete cart from DB
                await CartDb.deleteOne({ cart_id: cartId });
                return res.status(404).json({
                    success: false, message:
                        `${product.productName} available stock: ${product.productStock}, and you ordered ${item.quantity}, we are sorry for letting you face that, you can solve this by make a new order with quantity less than or equal to ${product.productStock}`
                })
            }
            item.product = product._id;
            item.discount = product.productDiscount;
            finalPrice = finalPrice + product.productPrice * (1 - product.productDiscount / 100) * item.quantity;
            await ProductDB.updateOne({ productId: item.productId }, { productStock: product.productStock - item.quantity }, { new: true });
            delete item["productId"]
        };
        const tax = .16;
        const delivery = 5;
        finalPrice = finalPrice + finalPrice * tax + delivery;

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
            totalPrice: finalPrice
        }).save();
        /// update products stock
        /// clear cart cookie
        res.clearCookie("cart");
        /// delete cart from DB
        await CartDb.deleteOne({ cart_id: cartId });
        /// send email to user
        const htmlPath = path.resolve("views/orderConfirmation.html");
        const html = fs.readFileSync(htmlPath, "utf-8").replace("${$order_number}", order_id).
            replace("${$email$}", email).replace("${$order_number}", order_id);
        const input = {
            email, // Recipient's email address
            sub: "New Order from Green Galaxy",
            text: "Thank you for trust Green Galaxy",
            html
        }
        sendEmail(input);
        /// send email with reciept to user 
        return res.status(200).json({ success: true, orderNumber: order_id, message: `Thank you for trust Green Galaxy, you can track your order using this order number ${order_id}` })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Somthing Error, try again later." })
    }
}

export default newOrder