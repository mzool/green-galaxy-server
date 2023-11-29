import Joi from "joi";

const addProductSchema = {
    body: Joi.object().required().keys({
        productName: Joi.string().required().label("Product name"),
        productDescription: Joi.string().required().label("Product description"),
        productCategory: Joi.string().required().label("Product category"),
        productPrice: Joi.string().required().label("Product price"),
        productStock: Joi.number().integer().min(0).required().label("Stock quantity"),
        availableCountries: Joi.array().items(Joi.string().label("Country")).optional(),
        productBrand: Joi.string().optional(),
        productColors: Joi.array().optional(),
        productSizes: Joi.array().optional(),
        productOtherVarients: Joi.array().optional(),
    })
};

export default addProductSchema;
