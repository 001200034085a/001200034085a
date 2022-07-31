const express=require("express");
const contactRouter=express.Router();

contactRouter.get("/",(req,res)=>{
    res.render("contact")
})

module.exports=contactRouter;