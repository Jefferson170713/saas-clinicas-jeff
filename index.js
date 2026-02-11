const { Person } = require("./person.js");
require("./modules/path.js");
require("./modules/fs.js");
require("./modules/http.js");

const person1 = new Person("Jefferson");
const person2 = new Person("Maria Rayssa");

console.log(person1.sayMyName());
console.log(person2.sayMyName());