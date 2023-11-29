import Joi from "joi";

const getOtpSchema = {
    body: Joi.object().required().keys({
        otp: Joi.number().required("otp is required.")
    })
}


export default getOtpSchema