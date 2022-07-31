var express = require('express');
const { registerValidate ,loginValidate } = require('../validation/validate');
var router = express.Router();
const usersModel=require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const authMidleware=require("../midleware/authMidleware");

// 1.viết api đăng ký
// -kt email trong hệ thống chưa ?
// -mã hóa password
// -tạo new user
router.post("/register", async(req,res)=>{
  // validate user
 const {error}=registerValidate(req.body);
 if(error) return res.status(400).send(error.details[0].message);

//  kt email có tồn tại trong hệ thống hay chưa
const emailExist = await usersModel.findOne({email:req.body.email});
if(emailExist) return res.status(400).send("đã có email trong hệ thống");

// hash passwword
const salt= await bcrypt.genSalt(10);
const hashPassword= await bcrypt.hash(req.body.password,salt);
// tạo một user
const newUser =new usersModel();
newUser.name=req.body.name;
newUser.email=req.body.email;
newUser.password=hashPassword;
newUser.age=req.body.age;
newUser.phone=req.body.phone;
newUser.address=req.body.address;
newUser.gender=req.body.gender;

try{
   const user= await newUser.save();
   res.send(user)
}
catch(error){
   res.status(400).send(error)
}
})
// 2.viết một api thực hiện login vào hệ thống
// -kt có đúng email 
// -kt password
// generate ra chuỗi token(dựa trên  secret string- chuỗi bí mật);
  router.post("/login", async(req,res)=>{
     const {error} =loginValidate(req.body);
     if(error) return req.status(400).send(error.details[0].message);

    //  kt email trong hệ thống
     const userLogin = await usersModel.findOne({email:req.body.email});
     if(!userLogin) return res.send("không có email trong hệ thống");

    // kt password có đúng không
    const passwordLogin= await bcrypt.compare(req.body.password,userLogin.password);
    if(!passwordLogin) return res.send("sai mật khẩu");

    // generate chuỗi token
    const token=jwt.sign({_id:userLogin._id},"chuoibimat");
    res.header('auth-token',token).send(token)

  })

// 3.viết một api trả về chuỗi string("hello world")
// nếu api gắn chuỗi token được generate từ bước 2 nếu đúng trả về hello world
// nếu api gắn chuỗi token fake thì trả về không có quyền truy cập
// nếu api không gắn token thì trả về không có quyên truy cập
// tạo ra một hàm găn vào midleware
router.get("/",authMidleware,(req,res)=>{
  // midleware
  res.send("hello world")
})

module.exports = router;
