import Joi from 'joi';

export const informationSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    nationality: Joi.string().required(),
}).unknown();