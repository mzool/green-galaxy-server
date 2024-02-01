import { rateLimit } from 'express-rate-limit'
/// over all requests
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
//// for email confirmation 
const resendEmailConfirmationLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    max: 1, // Limit each IP to 1 request per windowMs
    message: 'Too many requests from this IP, please try again after a day.',
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

})
/// for OTP
const OTPLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
    max: 10, // Limit each IP to 1 request per windowMs
    message: 'Too many requests from this IP, please try again after an hour.',
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

});
//// forget password limiter
const forgetPasswordLimiter = rateLimit({
    windowMs: 24* 60 * 60 * 1000, // 1 day in milliseconds
    max: 1, // Limit each IP to 1 request per windowMs
    message: 'We had sent an email with new password for this email, you can try again after one day.',
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

});
//// enable tow steps login
const towStepsLoginLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    max: 1, // Limit each IP to 1 request per windowMs
    message: 'You can update tow time seps login once a day',
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

});

export { resendEmailConfirmationLimiter, OTPLimiter, forgetPasswordLimiter, towStepsLoginLimiter }
export default limiter