import Joi from "joi";

const newBlogSchema = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        body: Joi.string().required()
    })
}

export default newBlogSchema