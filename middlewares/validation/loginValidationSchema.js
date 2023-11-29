import Joi from "joi"

const loginSchema = {
    body: Joi.object().required().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
            .required(),
        password: Joi.string().required()
    })
}

export default loginSchema