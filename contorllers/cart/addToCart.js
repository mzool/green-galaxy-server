import logger from "../../services/winston_logger.js"
import CartDB from "../../model/cart/Cart.js";
import generateRandomString from "../../services/randomString.js";
import product from "../../model/products/product.js";
import user from "../../model/users.js"
import { verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs"
async function AddToCart(req, res) {
    try {
        let { productId, color, size, otherVarients, quantity } = req.body.items;
        let cookies = req.cookies;
        /// check for past cart and user cookies
        const user_token = cookies.user;
        const cart_id = cookies.cart;
        //// get new product information from products db
        const newProduct = await product.findOne({ productId });
        let theUser;
        //// if there a user token get the user id
        if (user_token) {
            const publickKey = fs.readFileSync("publicKey.pem");
            const payload = await verifyPasetoToken(user_token, publickKey);
            theUser = await user.findOne({ user_id: payload.payload.id });
            if (!theUser) {
                res.clearCookie("user");
                return res.status(401).json({ success: false, message: "Session Expired!" })
            }
        }

        //// if there is a past cart then add the new items to it
        const pastCart = await CartDB.findOne({ cart_id });
        if (cart_id && !pastCart) {
            res.clearCookie("cart");
            return res.status(404).json({ success: false, message: "cart not found" })
        }
        const x = quantity;
        let targetId;
        if (pastCart) {
            //// get all items in that cart
            const allPastCartProductsIds = pastCart.items.map((item) => { return item.product });
            //// get products infromation of the cart items
            const pastCartProductsInfo = await product.find({ _id: { $in: allPastCartProductsIds } });
            //// loop around the pastCartProductsInfo and check if newProduct id match any one of them, then check if the cartItems 
            //// varients exact if yes then increase the quantity else new item
            pastCartProductsInfo.forEach((product) => {
                if (product.productId == productId) {
                    pastCart.items.forEach((item) => {
                        if (product._id.toString() == item.product.toString()) {
                            if ((!color || item.color == color) && (!size || item.size == size) && (!otherVarients || item.otherVarients == otherVarients)) {
                                quantity = Number(quantity) + Number(item.quantity);
                                targetId = item.product;
                            }
                        }
                    })
                }
            });
            //////// if quantity not equal x then the product are duplicated 
            if (quantity != x) {
                await CartDB.updateOne({
                    cart_id,
                    "items.product": targetId
                }, {
                    $set: {
                        "items.$.quantity": quantity,
                        user: pastCart.user || (theUser._id ? theUser._id : null)
                    }
                }, { new: true });
                return res.status(200).json({ success: true, message: "cart quantity updated successfully" })
            } else {  /// create new item if new product
                await CartDB.updateOne({ cart_id }, {
                    items: [...pastCart.items, {
                        product: newProduct._id,
                        color: color || "",
                        size: size || "",
                        otherVarients: otherVarients || "",
                        quantity,

                    }],
                    user: pastCart.user || (theUser._id ? theUser._id : null)
                }, { new: true })
                return res.status(200).json({ success: true, message: "cart added successfully" })

            }

        } else {  /// create new cart 
            let cart_id = generateRandomString(10);
            let checker = true;
            let isIdGood = await CartDB.findOne({ cart_id });
            while (checker) {
                isIdGood = await CartDB.findOne({ cart_id });
                isIdGood ? checker = generateRandomString(10) : checker = false
            }
            const newCart = await new CartDB({
                cart_id,
                items: {
                    product: newProduct._id,
                    color: color || "",
                    size: size || "",
                    otherVarients: otherVarients || "",
                    quantity,

                },
                user: theUser ? theUser._id : null
            }).save()
            res.cookie('cart', cart_id, {
                maxAge: 365 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: true, // Only sends the cookie over HTTPS
                sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
            });
            return res.status(200).json({ success: true, message: "cart added successfully" })

        }



    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later." })
    }
}

export default AddToCart

