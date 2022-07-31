// 4.create modules

// cách 1
module.exports.getMyDateTime=()=>{
  return Date();
};

// cách 2
exports.getDirName=()=>{
    return __dirname
};

console.log("modules-content",module)

// 
const My_Age=31;

exports.myAge=My_Age;

// info

const sum=(a,b)=>{
  return a+b
}
const person=class{
    constructor(name,age){
        this.name=name,
        this.age=age
    }
    showInFo(){
        console.log("name="+this.name+","+"age="+this.age)
    }
}
const info={
    name:"phú",
    age:22,
    sum: sum,
    person:person
}

exports.InFo=info;