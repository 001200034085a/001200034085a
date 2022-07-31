const express= require("express");
const joi=require("joi");
const usersRouter=express.Router();

const users=[
    {"id":1,"name":"phú lỉn","age":22,"phoneNumber":"001200034085","email":"dangtienphu23@gmail.com","gender":"nam"}
]

usersRouter.get("/",(req,res)=>{
    res.send(users)
});

usersRouter.post("/",(req,res)=>{
    const {error}=validate(req.body);
    if(error){;
        res.status(400).send(error.details[0].message)
    }
    else{
        const newData={
        id:users[users.length-1].id+1,
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender
        }
     users.push( newData);
    res.send(users);
    } 
});

usersRouter.put("/",(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    else{
        const newData1=[...users];
        for(let item of users){
            if(item.id === req.body.id){
                item.name=req.body.name,
                item.age=req.body.age,
                item.email=req.body.email,
                item.phoneNumber=req.body.phoneNumber,
                item.gender=req.body.gender
    }
   }
   res.send(newData1);
    }
   
});

usersRouter.delete("/",(req,res)=>{
    const newData2=[...users].filter(x=>x.id !== req.body.id);
    res.send(newData2);
});

const validate=(user)=>{
    const schema=joi.object({
        id:joi.number(),

        name:joi.string()
        .regex(/[A-Za-z]$/)
        .min(5)
        .required(),

        email:joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net',"tk","js"] } }),

        phoneNumber:joi.string()
        .pattern(new RegExp('^[0-9]{10,12}$')),
        
        age:joi.number()
        .integer()
        .min(1)
        .max(200),
        
        gender:joi.string()
        .regex(/nam$|nữ$|khác$/)
        .required()
    });
    return schema.validate(user );
}


module.exports=usersRouter;