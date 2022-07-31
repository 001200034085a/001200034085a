var express= require("express");

const app =express();


app.get("/",(req,res)=>{
    res.end("<h1>Wellcome to HomePage</h1>")
})
app.get("/about",(req,res)=>{
    res.end("<h1>This is AboutPage</h1>")
})
app.get("/*",(req,res)=>{
    res.end("<h1>404 Not Found</h1>")
})

var sever= app.listen(8001,()=>{
    const host =sever.address().address;
    const port= sever.address().port;

    console.log("sever đang lắng nghe trên địa chỉ  //http:",host,port)
})