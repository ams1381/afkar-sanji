import Joi from 'joi';

export const educationalSchema = Joi.object({
    university: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    degree: Joi.string().required(),
    field: Joi.string().required()
    // edu_type: Joi.string().required(),
}).unknown();

export const skillsSchema = Joi.object({
    level: Joi.string().required(),
    field: Joi.string().required(),
}).unknown();

export const achievementsSchema = Joi.object({
    field: Joi.string().required(),
    year: Joi.string().required(),
    institute: Joi.string().required()
})


export const workBackgroundstsSchema = Joi.object({
    position: Joi.string().required(),
    company: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required()
})

export const researchHistoriestsSchema = Joi.object({
    field: Joi.string().required(),
    year: Joi.string().required(),
    link: Joi.string().required()
})

