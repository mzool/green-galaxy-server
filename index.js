import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import limiter from "./services/limitRequests.js"
import compression from "compression"
import shouldCompress from "./services/compress.js"
import morgan from "morgan"
/// creating the server 
const app = express()
/// security
////////////////////////////////////////////////// helmet for security
import { helmetOptions, directives } from "./services/helmet.js"
import helmet from "helmet";
app.use(helmet(helmetOptions));
app.use(helmet.contentSecurityPolicy(directives));
/////////////////////////////////////////////// compress response
app.use(compression(shouldCompress))
///////////////////////////////////////////////////////////// use cors
import { corsOptions } from "./services/cors.js";
app.use(cors(corsOptions));
//////////////////////////////////////////////////// just 200 requests in 10 miniutes
//app.use(limiter)
////////////////////////////////////////////////// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", parameterLimit: 10000, extended: true }))
////////////////////////////////////////////////// cookie parser
import cookieParser from "cookie-parser"
app.use(cookieParser())
//////////////////////////////////////////////////////// loggers
import customLogFormat from "./services/requests_logging.js"
app.use(morgan(customLogFormat));
///////////////////////////////////////////////////// environment variables 
dotenv.config();
/// routes
const mainApi = process.env.apiurl
/// ////////////////////////////////////////////////all user routes
import { registerRouter, loginRouter, confirmEmailRouter, logoutRouter, contactUsRouter } from './routes/user routes/allUser.routes.js'
///////////////////////////////////////////////////////// registration route
app.use(mainApi, registerRouter)
////////////////////////////////////////////////////// confirm email route 
app.use(mainApi, confirmEmailRouter)
/////////////////////////////////////////////////////// resend confirmation email
import reSendRouter from "./routes/auth routes/resend_confrimationEmail.js"
app.use(mainApi, reSendRouter)
/// ////////////////////////////////////////////////////////login route
app.use(mainApi, loginRouter)
/////////////////////////////////////////////////////////////////// logout 
app.use(mainApi, logoutRouter)
////////////////////////////////////////////////////////////// contact us route
app.use(mainApi, contactUsRouter);
////////////////////////////////////////////////////////// get user information route
import getUserRouter from "./routes/auth routes/getUser.js"
app.use(mainApi, getUserRouter)
//////////////////////////////////////////////////////////////// subscribe 
import subscriberRouter from "./routes/subscribers/subscribers.route.js"
app.use(mainApi, subscriberRouter);
//////////////////////////////////////////////////////////////////////// products routes
import { addProductRouter, allProducts, filterRouter, onePrRouter, excelRouter } from "./routes/products/allProductsRoutes.js"
app.use(mainApi, addProductRouter)
app.use(mainApi, allProducts)
app.use(mainApi, onePrRouter)
app.use(mainApi, filterRouter)
app.use(mainApi, excelRouter)

////////////////////////////////////////////////////////////////////////////////// admin 
import { adminPermesionRouter, getOtpRouter, checkAdminCookieRouter, getAllProductsAdminRouter, editProductRouter } from "./routes/admin/allAdminRoutes.js"
app.use(mainApi, adminPermesionRouter)
app.use(mainApi, getOtpRouter)
app.use(mainApi, checkAdminCookieRouter)
app.use(mainApi, getAllProductsAdminRouter)
app.use(mainApi, editProductRouter)
/////////////////////////////////////////////////////////// blogs admin
import blogRouter from "./routes/admin/blogs/allBlogControllers.js"
app.use(mainApi, blogRouter)
////////////////////////////////////////////////////////////////////// blogs users
import { getAllBlogsRouter, getOneBlogRouter, newCommentRouter, allCommentsRouter } from "./routes/blogs/allBlogs.js"
app.use(mainApi, getAllBlogsRouter)
app.use(mainApi, getOneBlogRouter)
app.use(mainApi, newCommentRouter)
app.use(mainApi, allCommentsRouter)
///////////////////////////////////////////////////////// cart
import { addToCartRouter, getCartRouter, DeleteCartItemRouter, updateCartRouter } from "./routes/cart/allCartRouters.js"
app.use(mainApi, addToCartRouter)
app.use(mainApi, getCartRouter)
app.use(mainApi, DeleteCartItemRouter)
app.use(mainApi, updateCartRouter)

///////////////////////////////////////////////// checkout routers
import { getCheckoutPageRouter } from "./routes/checkout/allCheckoutRoutes.js";
app.use(mainApi, getCheckoutPageRouter);

/////////////////////////////////////////////////////////// orders routers
import {newOrderRouter} from "./routes/orders/allOrdersRouters.js";
app.use(mainApi, newOrderRouter)
/// DB and start server 
const url = process.env.url;
const PORT = (process.env.port) || 6000
import DB from "./model/db_functions.js"

/// 
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Error: ', err);
    }
    process.exit(1); // Exit the process with an error code
});

/// connect to DB
DB(url);

// import axios from "axios"
// import fs from "fs"
// app.get("/pr", (req, res) => {
//     axios.get('https://api.printful.com/store/variants/id?323057959', {
//         headers: {
//             "Authorization": "Bearer fylIZwIqfIt57KZBZiijksgjCnk8SxUEKc6JUKkp"
//         }
//     }).then(response => {
//         // Log the response from the external API
//         // Send a response to the client
//         fs.writeFileSync("printfulFileVarients.json", JSON.stringify(response.data.result))
//         res.json(response.data.result);
//     })
//         .catch(error => {
//             // Handle any errors here
//             console.error(error);
//             res.status(500).send("An error occurred while making the request.");
//         });


// })

