import Joi from "joi"
const regex = /^[a-zA-Z0-9 _.#]+$/

const newOrderSchema = {
    body: Joi.object().required().keys({
        firstName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim()
            .required(),
        lastName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim()
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        city: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim()
            .required(),
        address: Joi.string()
            .regex(/^[a-zA-Z_\- ]+$/)
            .trim()
            .required(),
        payment_method: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim().required(),

        items: Joi.array().items(
            Joi.object().keys({
                productId: Joi.string().regex(regex).required(),
                quantity: Joi.number().required(),
                color: Joi.string().regex(regex).optional().allow(""),
                size: Joi.string().regex(regex).optional().allow(""),
                otherVarients: Joi.string().regex(regex).optional().allow(""),
            })
        ),
        cartId:Joi.string().regex(regex).required(),

    })
}


export default newOrderSchema
