import ReturnsDB from "../../../model/returns/returnsDB.js";
import logger from "../../../services/winston_logger.js";
import generateString from "../../../services/randomString.js";
import OrderDB from "../../../model/orders/order.js"
import upladImages from "../../../services/uploadImagesToServer.js"
//// accepted values to add
const acceptedValues = ["order_id", "itemId", "id", "condition", "email", "customerNotes", "adminNotes", "shippingCost",
    "shippingMethod", "shippingAddress", "refundValue", "refundMethod", "refundDate", "refundType", "reason"]

async function newReturn(req, res) {
    try {
        /// get the order
        const theOrder = await OrderDB.findOne({ order_id: req.body.order_id });
        if (!theOrder) {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
        /// adding info to db
        const id = generateString(10);
        /// check if return id is exist in DB
        let checkReturn = await ReturnsDB.findOne({ id })
        while (checkReturn) {
            id = generateString(10);
            checkReturn = await ReturnsDB.findOne({ id })
        }
        /// upload images
        const urls = await upladImages(req.files, "Green_Galaxy/returns");
        const theBody = {
            id,
            order_id: req.body.order_id,
            itemId: req.body.itemId,
            reason: req.body.reason,
            userEmail: req.body.email,
            returnShipping: {
                cost: req.body.shippingCost,
                address: req.body.shippingAddress,
                method: req.body.shippingMethod
            },
            images: urls,
            condition: req.body.condition,
            refund: {
                value: req.body.refundValue,
                date: req.body.refundDate,
                method: req.body.refundMethod,
                refundType: {
                    method: req.body.refundType
                }
            },
            notes: {
                adminNotes: req.body.adminNotes,
                customerNotes: req.body.customerNotes
            }
        }
        const newReturn = await new ReturnsDB(theBody).save();
        return res.status(200).json({ success: true, message: "New return initiated" })

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default newReturn