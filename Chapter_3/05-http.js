// tạo một sever đơn giản bằng node js

const http=require("http");

const sever=http.createServer((req,res)=>{
    if(req.url==="/index"){
        res.end("<h1>WellCome To HomePage</h1>")
    }
    else if(req.url==="/about"){
        res.end("<h1>This it AboutPage</h1>")
    }
    else{
        res.end("<h1>404 Not Found</h1>")
    }
});

sever.listen(5000)