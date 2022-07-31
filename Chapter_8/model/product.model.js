const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const productSchema=new Schema({
    product_name:{
        type:String,
        required:true
    },
    product_price:{
        type:String,
        required:true
    },
    product_amount:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("product",productSchema);