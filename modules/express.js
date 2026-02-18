const express = require('express');

const port = 5324;

const app = express();

app.get('/', (req, res) => {
    res.status.send('/home');
});

app.get('/home', (req, res) => {
    res.status(200).send("<h1>Testando uma home page com express</h1>");
})

app.get('/users', (req, res) => {
    const users = [
        { name: "Jefferson", age: 32 },
        { name: "Maria Rayssa", age: 29 }
    ];
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}/home`);
});