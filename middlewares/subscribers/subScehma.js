import Joi from "joi";


const newSubscriber =
{
    body: Joi.object().required().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2})
            .required(),
    })
}


export default newSubscriber