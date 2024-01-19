import Joi from "joi";

const addProductSchema = {
    body: Joi.object().required().keys({
        productName: Joi.string().required().label("Product name"),
        productDescription: Joi.string().required().label("Product description"),
        productCategory: Joi.string().required().label("Product category"),
        productPrice: Joi.string().required().label("Product price"),
        productStock: Joi.number().integer().min(0).required().label("Stock quantity"),
        availableCountries: Joi.string().optional(),
        productBrand: Joi.string().optional(),
        productColors: Joi.string().optional(),
        productSizes: Joi.string().optional(),
        productOtherVarients: Joi.string().optional(),
        productDiscount:Joi.number().optional(),
        isMadeToOrder:Joi.string().optional()
    })
};

export default addProductSchema;
