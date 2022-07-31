var express = require('express');
const usersModel = require('../model/users.model');
var router = express.Router();
const joi =require("joi");

// post
router.post('/', function(req, res, next) {
  const {error}=validateUsers(req.body);
  if(error){
    res.status(400).send(error.details[0].message)
  }
  else{
    const users = new usersModel();
    users.name=req.body.name;
    users.age=req.body.age;
    users.address=req.body.address;
    users.phoneNumber=req.body.phoneNumber;
    users.email=req.body.email;
    users.gender=req.body.gender;

    users.save((err,docs)=>{
      if(err){
        res.send('lỗi lưu thông tin oto')
      }
      else{
        console.log('lưu thong tin thành công',docs)
        res.send(users)
      }
    })
  }
    
});

// get
router.get("/",(req,res)=>{
  const usersName=req.query.name;
  usersModel.find({name:usersName}).exec((err,users)=>{
    if(err){
      res.send("không thể lấy dữ liệu")
    }
    else{
      res.json(users)
    }
  })
});
// put 
router.put("/:id",(req,res)=>{
  usersModel.findOneAndUpdate({
    _id:req.params.id
  },{
    $set:{name:req.body.name,
      age:req.body.age,
      address:req.body.address,
      phoneNumber:req.body.phoneNumber,
      email:req.body.email,
      gender:req.body.gender},
    
  },{
    upsert:true
  },(err,users)=>{
    if(err){
      res.send("lỗi khi update")
    }
    else{
      res.send(users);
    }
  })
});

// delete
router.delete("/:id",(req,res)=>{
  usersModel.findByIdAndDelete({
    _id:req.params.id
  },(error,users)=>{
    if(error){
      res.send("xảy ra lỗi khi xóa thông tin")
    }
    else{
      res.send("xóa thnanhf công");
    }
  })
});

const validateUsers=(users)=>{
  const schema=joi.object({
    
      name:joi.string()
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

module.exports = router;