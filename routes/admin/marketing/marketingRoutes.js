import express from "express"
import newDiscount from "../../../controllers/admin/marketing/newDiscount.js";
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import newBlogAnnouncement from "../../../controllers/admin/marketing/newBlog.js";

const marketingRoutesRouter = express.Router();
/// post request
marketingRoutesRouter.post('/admin-marketing-newDiscount', isAdmin, newDiscount);
// blog
marketingRoutesRouter.post("/new-blog-announcement", isAdmin, newBlogAnnouncement)

export default marketingRoutesRouter