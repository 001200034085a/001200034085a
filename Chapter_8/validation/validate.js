const joi=require("joi");

// validate khi đăng ký người dùng
const registerValidate=(data)=>{
    const Schema=joi.object({
        name:joi.string()
        .min(5)
        .required(),

        age:joi.number()
        .min(1)
        .max(200)
        .required(),

        address:joi.string()
        .required(),

        gender:joi.string()
        .regex(/nam$|nữ$/)
        .required(),

        phone:joi.string()
        .pattern(new RegExp('^[0-9]{10,12}$'))
        .required(),

        email:joi.string()
        .email()
        .min(6)
        .required(),

        password:joi.string()
        .min(6)
        .required()
    });
    return Schema.validate(data);
};

// validate khi đăng nhập
const loginValidate=(data)=>{
    const Schema=joi.object({

        email:joi.string()
        .email()
        .min(6)
        .required(),

        password:joi.string()
        .min(6)
        .required()
    });
    return Schema.validate(data);
};
module.exports.registerValidate=registerValidate;
module.exports.loginValidate=loginValidate;