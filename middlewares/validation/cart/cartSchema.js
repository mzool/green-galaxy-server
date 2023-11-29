import Joi from "joi";
const regex = /^[a-zA-Z0-9 _]+$/
const AddToCartSchema = {
    body: Joi.object().required().keys({
        items: {
            productId: Joi.string().regex(regex).required(),
            quantity: Joi.number().min(1).required(),
            color: Joi.string().regex(regex).optional().allow(""),
            size: Joi.string().regex(regex).optional().allow(""),
            otherVarients: Joi.string().regex(regex).optional().allow(""),
        }
    })
};

export default AddToCartSchema;
