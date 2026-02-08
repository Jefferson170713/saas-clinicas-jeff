const fs = require("fs");
const path = require("path");

// Criando uma pasta de teste

fs.mkdir(path.join(__dirname, "/teste"), (error) => {
    if (error) {
        return console.log("Erro ao criar a pasta: " + error);
    }

    console.log("Pasta criada com sucesso!");
});