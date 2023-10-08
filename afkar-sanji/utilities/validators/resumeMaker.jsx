import Joi from 'joi';

export const educationalSchema = Joi.object({
    university: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    degree: Joi.string().required(),
    edu_type: Joi.string().required(),
}).unknown();

export const skillsSchema = Joi.object({
    level: Joi.string().required(),
    field: Joi.string().required(),

}).unknown();

// export default Joi.object({
//     first_name: Joi.string().required().messages({ 'string.base': 'نام شما خالی است' }),
//     last_name: Joi.string().required().messages({ 'string.base': 'نام خانوادگی شما خالی است' }),
//     address: Joi.string().required().messages({ 'string.base': 'آدرس شما خالی است' }),
//     phone_number: Joi.string().required().messages({ 'string.base': 'شماره تلفن خود را وارد نکرده اید' }),
//     city: Joi.string().required().messages({ 'string.base': 'شهر شما خالی است' }),
//     state: Joi.string().required().messages({ 'string.base': 'استان شما خالی است' }),
//     nationality: Joi.string().required().messages({'string.base': 'اطلاعات ملیت تکمیل نشده است'}),
//     gender: Joi.string().required().messages({ 'string.base': 'جنسیت شما خالی است' }),
//     marital_status: Joi.string().required().messages({ 'string.base': 'وضعیت ازدواج شما خالی است' }),
//     iranian_profile: Joi.object().when('nationality', {
//         is: 'ایرانی',
//         then: Joi.object({
//             national_code: Joi.string().required().messages({ 'string.base': 'کد ملی شما خالی است' }),
//             national_card_image: Joi.string().required().messages({ 'string.base': 'کارت ملی شما آپلود نشده است' }),
//             birth_certificate_image: Joi.string().required().messages({ 'string.base': 'شناسنامه شما آپلود نشده است' })
//         })
//     }).unknown().allow(null),
//     foreigner_profile: Joi.object().when('nationality', {
//         is: 'اتباع خارجی',
//         then: Joi.object({
//             exclusive_code: Joi.string().required().messages({ 'string.base': 'کد اختصاصی شما خالی است' }),
//         }),
//         otherwise: Joi.allow(null)
//     }).unknown()
// }).unknown