import Joi from "joi"


const contactUsSchema = {
    body: Joi.object().required().keys({
        name: Joi.string()
            .trim()
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        phone: Joi.string()
            .length(10)
            .required(),
        message: Joi.string()
            .min(0)
            .max(1000)
            .trim()
            .required(),
    })
}


export default contactUsSchema