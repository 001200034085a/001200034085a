const express=require("express");

const app=express();

app.get("/process_get",(req,res)=>{
    // Chuan bi output trong dinh dang JSON
    const reponse={
        first_name:req.query.first_name,
        last_name:req.query.last_name
    }
    console.log("reponse:",reponse);
    res.end(JSON.stringify(reponse))
});

const sever= app.listen(8081,()=>{
    const host = sever.address().address;
    const port=sever.address().port;

    console.log("lắng nghe tại đại chỉ //http:",host,port)
})