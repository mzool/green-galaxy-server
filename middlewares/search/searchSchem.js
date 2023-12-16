import Joi from "joi";
const regex = /^(?:(?:\d+(?:\.\d*)?)|(?:[a-zA-Z-]+))$/;
const searchSchema = {
    body: Joi.object().required().keys({
        search: Joi.string().regex(regex).required()

    })
}

export default searchSchema