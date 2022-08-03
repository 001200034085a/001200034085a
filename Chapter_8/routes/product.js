const express=require("express");
const productModel = require("../model/product.model");
const { productValidate } = require("../validation/productValidate");
const router =express.Router();
const jwt =require("jsonwebtoken");
const authMidleware = require("../midleware/authMidleware");


// post
router.post("/",authMidleware,async(req,res)=>{
    // validate
    const {error}=productValidate.apply(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // kt xem có sản phẩm này trong hệ thống chưa
    const Exist=await productModel.findOne({product_name:req.body.product_name});
    if(Exist) return res.status(400).send("dã có sản phẩm này trong hệ thống");

    const newProduct= new productModel();
    newProduct.product_name=req.body.product_name;
    newProduct.product_price=req.body.product_price;
    newProduct.product_amount=req.body.product_amount;

    try{
       const product= await newProduct.save();
       res.send(product)
    }
    catch(error){
        res.send(error)
    }
})

// get
router.get("/",(req,res)=>{
    productModel.findOne({product_name:req.query.product_name}).exec((error,product)=>{
        if(error){
            res.status(400).send("không tìm thấy sản phẩm")
        }
        else{
            res.json(product);
        }
    })
    
});

// put
router.put("/:_id",authMidleware,(req,res)=>{
    // validate
    const {error}=productValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    productModel.findOneAndUpdate({
      _id:req.params._id
    },{
      $set:{
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_amount:req.body.product_amount
      }
    },{
      upsert:true
    },(err,product)=>{
      if(err){
        res.status(400).send("lỗi khi update")
      }
      else{
        res.send(product);
      }
    })
  });
 

// delete
router.delete("/:_id",authMidleware,(req,res)=>{
    productModel.findOneAndDelete({
        _id:req.params._id
    },(error,product)=>{
        if(error){
            res.status(400).send(error)
        }else{
            res.send("xóa thành công")
        }
    })
});




module.exports=router;
