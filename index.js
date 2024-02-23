import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import limiter from "./services/limitRequests.js"
import compression from "compression"
import shouldCompress from "./services/compress.js"
import morgan from "morgan"
import { createServer } from "http"
import addAuthHeaderShellOne from "./middlewares/mainMiddlewares/addShellOne.js"
import authorizeReq from "./middlewares/auth/API_authorization.js"
/// creating the server 
const app = express();
/// connect to DB
const url = process.env.url;
const PORT = (process.env.port) || 6000
import DB from "./model/db_functions.js"
DB(url);
/// http server
const server = createServer(app);
/// security
////////////////////////////////////////////////// helmet for security
import { helmetOptions, directives } from "./services/helmet.js"
import helmet from "helmet";
app.use(helmet(helmetOptions));
app.use(process.env.apiurl, helmet.contentSecurityPolicy(directives));
/////////////////////////////////////////////// compress response
app.use(compression(shouldCompress))
///////////////////////////////////////////////////////////// use cors
import { corsOptions } from "./services/cors.js";
app.use(cors(corsOptions));
//////////////////////////////////////////////////// just 200 requests in 10 miniutes
app.use(limiter)
////////////////////////////////////////////////// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", parameterLimit: 50000, extended: true }))
////////////////////////////////////////////////// cookie parser
import cookieParser from "cookie-parser"
app.use(cookieParser())
//////////////////////////////////////////////////////// loggers
import customLogFormat from "./services/requests_logging.js"
app.use(morgan(customLogFormat));
///////////////////////////////////////////////////// environment variables 
dotenv.config();
/////////////////////////////////////////// main prox middlewares
/// track
import trackLocation from "./middlewares/mainMiddlewares/traffic.js"
app.use(trackLocation)
app.use(addAuthHeaderShellOne)
app.use(authorizeReq)
/// routes
const mainApi = process.env.apiurl
/// ////////////////////////////////////////////////all user routes
import { getOTPFromUserRouter, checkForOtpTokenRouter, enableTowStepsLoginRouter, cancellOrderRouter, getAllOrderRouter, changePasswordRouter, forgetPasswordRouter, registerRouter, loginRouter, confirmEmailRouter, logoutRouter, contactUsRouter } from './routes/user routes/allUser.routes.js'
app.use(mainApi, getAllOrderRouter)
app.use(mainApi, registerRouter)
app.use(mainApi, forgetPasswordRouter)
app.use(mainApi, changePasswordRouter)
app.use(mainApi, confirmEmailRouter)
app.use(mainApi, cancellOrderRouter)
app.use(mainApi, enableTowStepsLoginRouter)
app.use(mainApi, checkForOtpTokenRouter)
app.use(mainApi, getOTPFromUserRouter)


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
//////////////////////////////////////////////// update profile image router
import updateImageRouter from "./routes/user routes/changeProfileImage.js"
app.use(mainApi, updateImageRouter)
//////////////////////////////////////////////////////////////////////// products routes
import { addProductRouter, allProducts, filterRouter, onePrRouter, excelRouter } from "./routes/products/allProductsRoutes.js"
app.use(mainApi, addProductRouter)
app.use(mainApi, allProducts)
app.use(mainApi, onePrRouter)
app.use(mainApi, filterRouter)
app.use(mainApi, excelRouter)

////////////////////////////////////////////////////////////////////////////////// admin 
import {
    marketingRoutesRouter, adminReturnRouter, employeesRouter, updateOrderRouter,
    getAllOrdersRouter, addProductFileRouter, contactUsAdminRouter, editStyleRouter, getOtpRouter,
    checkAdminCookieRouter, getAllProductsAdminRouter, editProductRouter, sendOtpROuter, deleteProductRouter,
    imageGeneratorRouter
} from "./routes/admin/allAdminRoutes.js"
app.use(mainApi, getOtpRouter)
app.use(mainApi, checkAdminCookieRouter)
app.use(mainApi, getAllProductsAdminRouter)
app.use(mainApi, editProductRouter)
app.use(mainApi, sendOtpROuter)
app.use(mainApi, deleteProductRouter)
app.use(mainApi, imageGeneratorRouter)
app.use(mainApi, editStyleRouter)
app.use(mainApi, contactUsAdminRouter)
app.use(mainApi, addProductFileRouter)
app.use(mainApi, getAllOrdersRouter)
app.use(mainApi, updateOrderRouter)
app.use(mainApi, employeesRouter)
app.use(mainApi, adminReturnRouter)
app.use(mainApi, marketingRoutesRouter)

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

/////////////////////////////////////////////////////////// orders routers
import { newOrderRouter } from "./routes/orders/allOrdersRouters.js";
app.use(mainApi, newOrderRouter)

/////////////////////////// search router
import searchRouter from "./routes/search/searchRouter.js"
app.use(mainApi, searchRouter);

//////////////////////////////////////////////////////////// track order routers
import trackOrderRouter from "./routes/trackorder/trackOrderRouter.js"
app.use(mainApi, trackOrderRouter);

/////////////////////////////////////////////////////// chat with us
//chatWithUs(server);

//////////////////////////////////////////////////////////// style routers
import { homeStyleRouter } from "./routes/client/allClientRouters.js"
////// home style
app.use(mainApi, homeStyleRouter)
///////////////////////////////////////////////////////////// graphql
import { createHandler } from 'graphql-http/lib/use/express';
import graphRootSchema from "./graphqlSchemas/rootSchema.js"
app.use(process.env.graphQLAPI, createHandler({ schema: graphRootSchema }))
///////////////////////////////////////////////// google services


//////////////////////////////////////// start server 

/// listining to port 3000
server.listen(PORT, '0.0.0.0', () => {
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