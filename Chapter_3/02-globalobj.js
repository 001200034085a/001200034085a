// global obj

console.log("filename",__filename);

console.log("dirname",__dirname);

const hello=()=>{
   console.log("hello world")
}

hello();

const mini=()=>{
    setInterval(()=>{
        console.log("hello phú")
    },2000)
};

mini();


const arr=[1,2,3,4,5,6,6,7,7,8,8,9];

const a=()=>{
   arr.filter()
}