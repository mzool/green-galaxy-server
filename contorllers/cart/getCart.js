import CartDB from "../../model/cart/Cart.js";
import product from "../../model/products/product.js"
import logger from "../../services/winston_logger.js";
import getCookie from "../../services/getThCookie.js";

async function getCart(req, res) {
    try {
        /// get the cookies
        const { cookie } = req.headers;
        /// check if user is logged in and if there is a cart for him
        let cart_id = getCookie(cookie, "green_G_cart_", true);
        let token = getCookie(cookie, "user");
        /// check if there is a cart cookie
        let theCart;
        if (cart_id) {
            /// get the cart from DB
            theCart = await CartDB.findOne({ cart_id }).select(["-_id", "-createdAt", "-updatedAt", "-user_id", "-cart_id", "-__v"]).lean();
            /// if no cart in DB
            if (!theCart) {
                return res.status(404).json({ error: "no cart found for you." })
            }
            /// get products in the card from products DB
            let allCartProducts = [];
            async function fetchProductDetails() {
                let totalPrice;
                for (const pr of theCart.item) {
                    let _pr = await product.findOne({ productId: pr.productId }).select(["-_id", "-createdAt", "-updatedAt", "-productDescription"])
                    if (_pr) {
                        totalPrice = pr.quantity * _pr.productPrice
                        allCartProducts.push({
                            itemId: pr.itemId,
                            id: _pr.productId,
                            name: _pr.productName,
                            image: _pr.productImgs[0],
                            price: _pr.productPrice,
                            stock: _pr.productStock,
                            color: pr.color,
                            size: pr.size,
                            quantity: pr.quantity,
                            purchased: pr.purchased,
                            otherVarients: pr.otherVarients,
                            totalPrice
                        });
                    }
                }
            }
            await fetchProductDetails();

            /// send response
            return res.status(200).json({ success: true, message: "cart is here", cart:{allCartProducts, cart_id} });
            // /// does cart has user_id?
            // const userIdInTheCart = theCart.user_id;
            // /// if no user return the cart
            // if (!token && !userIdInTheCart) {
            //     return res.status(200).json({ success: true, message: "cart is here", theCart });
            // }
            /// check if the user id in the cart is same with user id
            /// first is there a user_id?
            /// get the user 
            // if (token) {
            //     let theUser;
            //     const publicKey = fs.readFileSync("publicKey.pem");
            //     const payload = await verifyPasetoToken(token, publicKey);
            //     if (payload) {
            //         theUser = await user.findOne({ user_id: payload.user_id });
            //         /// after check that user session is valid => check if there a cart token also
            //     }

            // }
        } else {
            return res.status(404).json({ error: "cart not found" })
        }

    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something went error, try again later." })
    }
}

export default getCart