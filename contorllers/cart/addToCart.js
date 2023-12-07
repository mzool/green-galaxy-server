import logger from "../../services/winston_logger.js"
import CartDB from "../../model/cart/Cart.js";
import generateRandomString from "../../services/randomString.js";
import idGenerator from "../../services/idGenerator.js"
import product from "../../model/products/product.js";
import user from "../../model/users.js"
import { verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs"
async function AddToCart(req, res) {
    try {
        const { productId, color, size, otherVarients, quantity } = req.body.items;
        let { cookie } = req.headers;
        /// check if user is logged in
        let user_id;
        /// if there is a past cart then update it 
        let pastCart;
        /// if there are cookie 
        if (cookie) {
            cookie.split(";").map((cookie) => {
                cookie.split("=")[0].trim() === "user" ? user_id = cookie.split("=")[1] : null
                cookie.split("=")[0].trim().includes("green_G_cart_") ? pastCart = cookie.split("=")[1].trim() : null
            });
        }

        const theProduct = await product.findOne({ productId });
        /// check if the product is exist
        if (!theProduct) {
            return res.status(404).json({ error: "Prodcut not found!" })
        }
        /// check of the user logged in
        let theUser;
        if (user_id) {
            let publicKey = fs.readFileSync("publicKey.pem");
            let UserId = await verifyPasetoToken(user_id, publicKey);
            if (UserId) {
                theUser = await user.findOne({ user_id: UserId.payload.user_id });
                if (!theUser) {
                    res.clearCookie(pastCart);
                    res.clearCookie("user")
                    return res.status(401).json({ error: "Unauthorized" })
                }
            } else {
                return res.status(400).json({error:"Session expired, login again to save you cart or contiue as a guist"})
            }

        }
        /// if past cart update else new one
        if (pastCart) {
            let pastItems = await CartDB.findOne({ cart_id: pastCart });
            if (!pastItems) {
                /// unhandled erro
                return res.status(500).json({ error: "Something went error, please try again later." })
            } else {
                /// check if user try to add same item again
                let _end = false;
                let UpdatedCart = pastItems.item.map((itm) => {
                    if (itm.color == color && itm.size == size && itm.otherVarients == otherVarients
                        && itm.productId == productId && itm.purchased == false) {
                        let newQuantity = Number(quantity) + itm.quantity;
                        _end = true;
                        itm.quantity = newQuantity;
                    }
                    return itm
                })
                await CartDB.updateOne({ cart_id: pastCart }, { item: UpdatedCart }, { new: true })
                if (_end) {
                    return res.status(200).json({ success: true, message: "item quantity changed successfully" })
                }
                /// if not the same item
                let allPastItems = pastItems.item;
                let itemId = idGenerator(5);
                /// check if itemId not exist
                let itmeIdChecker = true;
                while (itmeIdChecker) {
                    itmeIdChecker = false;
                    allPastItems.forEach((item) => {
                        if (item.itemId == itemId) {
                            itmeIdChecker = true
                        }
                    })
                }
                allPastItems.push({
                    itemId,
                    productId,
                    color: color || "",
                    size: size || "",
                    otherVarients: otherVarients || "",
                    quantity,
                })
                await CartDB.updateOne({ cart_id: pastCart }, { item: allPastItems }, { new: true });
                return res.status(200).json({ success: true, message: "cart updated successfully" })
            }
        } else {
            /// generate a cart id
            let cart_id = generateRandomString(10);
            /// check if the cart id is already exist
            let checker = true;
            while (checker == true) {
                let ifTheCartExist = await CartDB.findOne({ cart_id });
                if (!ifTheCartExist) {
                    checker = false;
                } else {
                    cart_id = generateRandomString(10)
                }
            }
            /// item id
            let itemId = idGenerator(5);

            /// save cart to data base
            let theUserCart = new CartDB({
                cart_id,
                item: {
                    itemId,
                    productId,
                    color: color || "",
                    size: size || "",
                    otherVarients: otherVarients || "",
                    quantity,

                },
                user_id: theUser ? theUser.user_id : ""
            }).save();
            /// send back cookie
            res.cookie(`green_G_cart_${cart_id}`, cart_id, {
                maxAge: 365 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: true, // Only sends the cookie over HTTPS
                //  sameSite: 'strict', // Protects against cross-site request forgery (CSRF) attacks
            });
        }

        return res.status(200).json({ success: true, message: "cart added successfully" })

    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later." })
    }
}

export default AddToCart