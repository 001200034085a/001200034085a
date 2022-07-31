const express=require("express");
const joi= require("joi");
const mangaRouter=express.Router();


const mangas=[
    {"id":1,"name":"one piece"}
];
// get
mangaRouter.get("/",(req,res)=>{
    res.send(mangas)
});
// post
mangaRouter.post("/",(req,res)=>{
    const {error}=validateMangas(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }
    else{
        const newData={
        id:mangas[mangas.length-1].id+1,
        name:req.body.name
    }
    mangas.push(newData);
    res.send(mangas)
    } 
});
// put 
mangaRouter.put("/",(req,res)=>{
    const newData1=[...mangas];
    for(let item of mangas){
        if(item.id === req.body.id){
            item.name=req.body.name
        }
    }
    res.send(newData1);
});
// delete
mangaRouter.delete("/",(req,res)=>{
    const newData2=[...mangas].filter(x=>{
        return x.id !== req.body.id
    });
    res.send(newData2);
});
// validate
const validateMangas=(mangas)=>{
   const schema=joi.object({
    name:joi.string()
    .alphanum()
    .min(5)
    .max(40)
    .required()
   });
   return schema.validate(mangas);
}

module.exports=mangaRouter;