import Joi from "joi";

const newCommentSchema = {
    body: Joi.object().required().keys({
        username: Joi.string()
            .min(1)
            .max(30)
            .regex(/^[a-zA-Z0-9_]+$/)
            .trim()
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),
        body: Joi.string().regex(/^[a-zA-Z0-9_,; .]*$/).min(1).max(300).required()
    }),

}

export default newCommentSchema