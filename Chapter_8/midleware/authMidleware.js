const jwt=require("jsonwebtoken");

const authMidleware=(req,res,next)=>{
   const token=req.header('auth-token');
   if(!token) return res.status(401).send("could not access to system");

//    check token iscorrect or incorrect
try{
    // verifi
    const checkToken=jwt.verify(token,"chuoibimat");
    req.user=checkToken
   next();
}
catch(err){
    res.status(400).send("token incorrect")
}
};

module.exports=authMidleware;
