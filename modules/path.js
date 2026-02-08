const path = require("path");

// Nome do diretório atual
const filePath = path.join(__dirname, "person.js");
// Nome do arquivo atual
const nameFile = path.basename(__filename);
// Pegando o dirétório do arquivo atual
const nameDir = path.dirname(__dirname);
// Extensão do arquivo atual
const nameExt = path.extname(__filename);


// console.log(filePath);
// console.log(nameDir);
// console.log(nameFile);
// console.log(nameExt);
// console.log(path.parse(__filename));