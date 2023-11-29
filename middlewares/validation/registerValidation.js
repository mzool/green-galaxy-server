import Joi from "joi";
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const registerSchema = {
    body: Joi.object().required().keys({
        username: Joi.string()
            .min(8)
            .max(30)
            .regex(/^[a-zA-Z0-9_]+$/)
            .trim()
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),

        address: Joi.string()
            .max(100)
            .regex(/^[a-zA-Z0-9\s]+$/)
            .optional(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        isAdmin: Joi.string().valid("superAdmin", "admin", "user").optional()
    })
}


export default registerSchema


















