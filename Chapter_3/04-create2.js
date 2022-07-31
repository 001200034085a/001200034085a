const createModules1=require(`./04-create`);

console.log("------------modules đc import-----------");
console.log(createModules1);

console.log("modules2-content",module);


const myDateTime=createModules1.getMyDateTime();
const myDir=createModules1.getDirName();
const myAge=createModules1.myAge;
const InFo =createModules1.InFo;

console.log("myDateTime",myDateTime);
console.log("myDir",myDir);
console.log("myAge:",myAge);
console.log("info:",InFo);

const total=createModules1.InFo.sum(12,22);
console.log("total:",total);

const person =new InFo.person("đặng tiến phú",22);
person.showInFo();

