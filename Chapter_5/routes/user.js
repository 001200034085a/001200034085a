const express=require("express");
const usersRouter=express.Router();
const joi=require("joi");


usersRouter.post("/",(req,res)=>{
     const{error}=validateUsers(req.body);
   if(error){
    res.status(400).send(error.details[0].message);
   }
   else{
     const{body}=req;
     res.render("user",{body}); 
   }
});

const validateUsers=(users)=>{
    const schema=joi.object({
        firstName:joi.string()
        .regex(/[A-Za-z]$/)
        .min(1)
        .required(),
  
        lastName:joi.string()
        .regex(/[A-Za-z]$/)
        .min(1)
        .required(),
  
        email:joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net',"vn"] } }),
  
        phoneNumber:joi.string()
        .pattern(new RegExp('^[0-9]{10,12}$')),
  
        birthDay:joi.number()
        .integer()
        .min(1900)
        .max(2022),
  
        gender:joi.string()
        .regex(/Nam$|Nữ$/)
        .required()
    });
    return schema.validate(users);
  } 

module.exports=usersRouter;