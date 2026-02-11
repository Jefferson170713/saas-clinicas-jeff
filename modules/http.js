const http = require('http');

const port = 5324;

const server = http.createServer((req, res) => {
    if (req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Testtando uma home page</h1>");
    }
    
    if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const users = [
            { 
                name: "Jefferson", 
                age: 32 
            },
            { 
                name: "Maria Rayssa",
                age: 29
            }
        ];
        res.end(JSON.stringify(users));
    }
});

const message = `Servidor rodando na porta: ${port}`;

server.listen(port, () => {
    console.log(message);
    console.log(`Acesse: http://localhost:${port}/home`);
});