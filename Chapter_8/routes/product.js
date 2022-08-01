const express=require("express");
const router=express.Router();
const productModel=require("../model/product.model");
const { productValidate } = require("../validation/productValidate");
const jwt=require("jsonwebtoken");
const authMidleware= require("../midleware/authMidleware");


// post một sản phẩm
router.post("/",async(req,res)=>{
    // validate sản phẩm
   const {error}=productValidate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   //  kt sản phẩm có trong hệ thống chưa
   const Exist = await productModel.findOne({product_name:req.body.product_name});
   if(Exist) return res.status(400).send("đã có sản phẩm trong hệ thống");

   const newProduct= new productModel();
   newProduct.product_name=req.body.product_name;
   newProduct.product_price=req.body.product_price;
   newProduct.product_amount=req.body.product_amount;

   try{
     const product= await newProduct.save();
     res.send(product)
   }
   catch(error){
    res.status(400).send(error)
   };
   

});

router.post("/search", async(req,res)=>{
    const {error} =productValidate(req.body);
    if(error) return req.status(400).send(error.details[0].message);

   //  kt sản phẩm trong hệ thống
    const Exist = await productModel.findOne({product_name:req.body.product_name});
    if(!Exist) return res.send("không có sản phẩm này trong hệ thống");


   // generate chuỗi token
   const token=jwt.sign({_id:Exist._id},"chuoibimat");
   res.header('auth-token',token).send(token)

 });


// get 
router.get("/",(req,res)=>{
   productModel.findOne({product_name:req.query.product_name}).exec((error,product)=>{
    if(error){
        res.send("có lỗi khi lấy dữ liệu",error)
    }
    else{
        res.json(product)
    }
   })

});

// put
router.put("/:_id",(req,res)=>{
     // validate sản phẩm
   const {error}=productValidate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

    productModel.findOneAndUpdate({
        _id:req.params._id
    },
    {
        $set:{product_name:req.body.product_name,
            product_price:req.body.product_price,
            product_amount:req.body.product_amount
          },
        
      },
      {
        upsert:true
      },(err,product)=>{
        if(err){
          res.send("lỗi khi update")
        }
        else{
          res.send(product);
        }
      }
    )
});

router.put("/search/:id", async(req,res)=>{
    const {error} =productValidate(req.body);
    if(error) return req.status(400).send(error.details[0].message);

   //  kt sản phẩm trong hệ thống
    const Exist = await productModel.findOne({product_name:req.body.product_name});
    if(!Exist) return res.send("không có sản phẩm này trong hệ thống");


   // generate chuỗi token
   const token=jwt.sign({_id:Exist._id},"chuoibimat");
   res.header('auth-token',token).send(token)

 });
// delete
 router.delete("/:id",(req,res)=>{
    productModel.findByIdAndDelete({
        _id:req.params.id
      },(error,product)=>{
        if(error){
          res.send("xảy ra lỗi khi xóa thông tin")
        }
        else{
          res.send("xóa thành công");
        }
      })
 })

 router.delete("/search/:id", async(req,res)=>{
    const {error} =productValidate(req.body);
    if(error) return req.status(400).send(error.details[0].message);

   //  kt sản phẩm trong hệ thống
    const Exist = await productModel.findOne({product_name:req.body.product_name});
    if(!Exist) return res.send("không có sản phẩm này trong hệ thống");


   // generate chuỗi token
   const token=jwt.sign({_id:Exist._id},"chuoibimat");
   res.header('auth-token',token).send(token)

 });

// tạo ra một hàm găn vào midleware
 router.get("/",authMidleware,(req,res)=>{
    // midleware
    res.send("hello world")
  })
module.exports=router;
