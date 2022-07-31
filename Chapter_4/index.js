const jsonExport=require("jsonexport");

// const contacts=[
//     {
//         "name":"đặng tiến phú",
//         "age":22,
//         "courseName":"web"
//     },
//     {
//         "name":"lỉn",
//         "age":23,
//         "courseName":"web"
//     }
// ];

const contacts=require("./tc");

jsonExport(contacts, function(err, csv){
    if (err) return console.error(err);
    console.log("csv:",csv);
});


// bt test

var {fromIsoToHuman, fromHumanToIso} = require('@sineverba/date-convert');

var humanDate = fromIsoToHuman("20200102");
console.log(humanDate); // returns 02/01/2020

var humanDate = fromIsoToHuman("20200102", "YYYY-MM-DD");
console.log(humanDate); // returns 2020-01-02

var isoDate = fromHumanToIso("02/01/2020")
console.log(isoDate); // returns 20200102