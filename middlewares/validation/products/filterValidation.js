import Joi from "joi"



const filterSchema ={
    body: Joi.object().required().keys({
        color: Joi.string().optional(),
        price:Joi.number().optional(),
        category: Joi.string().optional()
    })
}

export default filterSchema