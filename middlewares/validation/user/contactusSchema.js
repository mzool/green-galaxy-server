import Joi from "joi"


const contactUsSchema = {
    body: Joi.object().required().keys({
        name: Joi.string()
            .regex(/^[a-zA-Z0-9_ +]+$/)
            .trim()
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        message: Joi.string()
            .min(0)
            .max(1000)
            .regex(/^[a-zA-Z0-9_.,; +]+$/)
            .trim()
            .required(),
    })
}


export default contactUsSchema