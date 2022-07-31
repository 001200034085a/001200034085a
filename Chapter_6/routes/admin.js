const express=require("express");
const adminRouter=express.Router();

adminRouter.get("/",(req,res)=>{
    res.send("hello admin")
})

module.exports=adminRouter;