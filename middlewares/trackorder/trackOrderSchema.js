import Joi from "joi"
const regex = /^[a-zA-Z0-9_]+$/;
const trackOrderSchema = {
    body:Joi.object().required().keys({
        orderNumber: Joi.string().regex(regex).required()
    })
}

export default trackOrderSchema