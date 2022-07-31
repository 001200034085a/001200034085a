const joi=require("joi");

const productValidate=(product)=>{
    const Schema=joi.object({
        product_name:joi.string()
        .required(),

        product_price:joi.string()
        .required(),

        product_amount:joi.string()
        .required(),
    });
    return Schema.validate(product);
}
module.exports.productValidate=productValidate;