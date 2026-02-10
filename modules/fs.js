const fs = require("fs");
const path = require("path");

// Criando uma pasta de teste 01 - parte 01
// Vou comentar para não criar a pasta toda vez que rodar o código, mas é só descomentar para criar a pasta

// fs.mkdir(path.join(__dirname, "/Teste"), (error) => {
//     if (error) {
//         return console.log("Erro ao criar a pasta: " + error);
//     }

//     console.log("Pasta criada com sucesso!");
// });


// // Criando um arquivo de teste dentro da pasta de teste 01 - parte 02
// // Isso só vai dar certo se a pasta for ciraada primeiro

// fs.writeFile(path.join(__dirname, "/Teste", "teste.txt"), "Arquivo criado dentro da pasta com sucesso!", (error) => {
//     if (error) {
//         return console.log("Erro ao criar o arquivo: " + error);
//     }

//     console.log("Arquivo criado com sucesso!");
// });

// // Adiccionando mais conteúdo ao arquivo de teste - parte 03
// // Precisa da parte dois pra funcionar

// fs.appendFile(path.join(__dirname, "/Teste", "teste.txt"), "\nOlá amigo, testando adicionar mais conteúdo!", (error) => {
//     if (error) {
//         return console.log("Erro ao adicionar conteúdo ao arquivo: " + error);
//     }
//     console.log("Conteúdo adicionado com sucesso!");
// });

// // Lendo o arquivo de teste - parte 04

// fs.readFile(path.join(__dirname, "/Teste", "teste.txt"), "utf-8", (error, data) => {
//     if (error) {
//         return console.log("Error ao tentar ler o arquivo: " + error);
//     }
//     console.log("Conteúdo do arquivo: \n" + data);
// });