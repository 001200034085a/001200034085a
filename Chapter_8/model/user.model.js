const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const usesrSchema =new Schema({
    name:{
        required:true,
        type:String,
    },
    age:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    
});

module.exports=mongoose.model("users",usesrSchema);