
async function getTotalSales(req, res) {
    try {

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}

export default getTotalSales