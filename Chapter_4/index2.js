const express=require("express");
const app=express();
const mangaRouter=require("./MangaRouter");
const usersRouter=require("./UsersRouter");

app.use(express.json());
app.use("/api/manga",mangaRouter)
app.use("/api/user",usersRouter);

app.listen(5000,()=>{
    console.log("sever running http://localhost:5000")
})