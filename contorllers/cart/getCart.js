import CartDB from "../../model/cart/Cart.js";
import logger from "../../services/winston_logger.js";

async function getCart(req, res) {
    try {
        /// get the cookies
        const cookies = req.cookies;
        /// get cart id
        const cart_id = cookies.cart;

        if (cart_id) {
            /// get the cart from DB
            const theCart = await CartDB.findOne({ cart_id }).select(["-_id", "-createdAt", "-updatedAt", "-user", "-cart_id", "-__v"])
                .populate({
                    path: 'items.product',
                    model: 'product',
                })
                .lean();
            /// calculate the total price
            let totalPrice = 0;
            for (const item of theCart.items) {
                totalPrice += ((item.product.productPrice * ((100 - item.product.productDiscount) / 100)) * item.quantity)
            }
            //// specify what product data to send to user
            let allCartItems=[];
            for (const item of theCart.items){
                const obj = {
                    quantity:item.quantity,
                    color:item.color,
                    size:item.size,
                    otherVarients:item.otherVarients,
                    product:{
                        discount:item.product.productDiscount,
                        stock:item.product.productStock,
                        name:item.product.productName,
                        brand:item.product.productBrand,
                        id:item.product.productId,
                        price:item.product.productPrice,
                        images:item.product.productImgs,
                    },
                    _id:item._id
                }
                allCartItems.push(obj)
            }
            theCart.items = allCartItems;
            /// if no cart in DB
            if (!theCart) {
                res.clearCookie(cart_id);
                return res.status(404).json({ success: false, error: "no cart found for you." })
            }
            /// send response
            return res.status(200).json({ success: true, message: "cart is here", cartData: { cart: theCart, cartId: cart_id, totalPrice } });
        } else {
            return res.status(404).json({ success: false, error: "cart not found" })
        }

    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something went error, try again later." })
    }
}

export default getCart