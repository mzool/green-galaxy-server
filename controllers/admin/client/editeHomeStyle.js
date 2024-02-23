import HomePageStyleDB from "../../../model/client/homePage.js";
import logger from "../../../services/winston_logger.js"

const availableComponents = ["heroImage", "sales", "blogSection", "whyGreenGalaxy"]
async function editeHomeStyle(req, res) {
    try {
        const { style, component } = req.body;
        if (!style || !component) { return res.status(404).json({ success: false, message: "style required!" }) }
        if (availableComponents.indexOf(component) == -1) {
            return res.status(404).json({ success: false, message: "you can not syle this component" })
        }
        /// get past style so we can edit just one element
        let pastStyle = await HomePageStyleDB.find({}).select(["-_id", "-createdAt", "-updatedAt", "-__v"]).lean();
        /// if past style length is zero then it is the first time that we sending info
        if (pastStyle.length == 0) {
            const newStyle = await new HomePageStyleDB({
                [`${component}`]: style
            }).save();
            return res.status(200).json({ success: true, newStyle, message: `${component}-style added successfully` })
        }
        /// update the db
        const newStyle = {
            [`${component}`]: style,
        };
        await HomePageStyleDB.updateOne({}, newStyle, { new: true }).catch((e) => {
            logger.error(e);
            console.log(e.message);
            return res.status(503).json({ success: false, message: "DB error" })
        });
        return res.status(200).json({ success: true, message: "changes applied successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "Something went error, try again later" })
    }
}
export default editeHomeStyle