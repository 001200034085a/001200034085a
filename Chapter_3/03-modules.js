// path
const path =require('path');

console.log("path-modules",path);
console.log("path-sep",path.sep)

// os
const os=require("os");

console.log("os-modules",os)

// demotxt

var fs=require("fs");
fs.readFile("demoFile.txt","utf8",(err,data)=>{
  if(err) throw err;
  console.log(data)
});