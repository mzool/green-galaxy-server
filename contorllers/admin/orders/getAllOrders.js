import OrdersDB from "../../../model/orders/order.js"


async function getAllOrders(req, res) {
    try {
        const allOrders = await OrdersDB.find({}).select(["-_id", "-__v"]).lean();
        return res.status(200).json({ success: true, allOrders, numberOfOrders: allOrders.length })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
export default getAllOrders