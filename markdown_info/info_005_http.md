# Módulo HTTP - Node.js

## Visão Geral
O arquivo `http.js` cria um servidor web simples usando o módulo nativo `http` do Node.js. Este servidor responde a requisições HTTP em rotas específicas.

## Análise do Código

### 1. Importação do Módulo HTTP
```javascript
const http = require('http');
```
- Importa o módulo nativo `http` do Node.js
- Fornece ferramentas para criar servidores e fazer requisições HTTP

### 2. Configuração da Porta
```javascript
const port = 5324;
```
- Define a porta em que o servidor irá ouvir
- Neste caso: **porta 5324**

### 3. Criação do Servidor
```javascript
const server = http.createServer((req, res) => {
    // Lógica do servidor
});
```
- `http.createServer()` cria um novo servidor HTTP
- Recebe um callback com dois parâmetros:
  - **req** (request): objeto com informações da requisição do cliente
  - **res** (response): objeto para enviar resposta ao cliente

### 4. Rota /home
```javascript
if (req.url === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("<h1>Testtando uma home page</h1>");
}
```
- **Condição**: verifica se a URL é `/home`
- **res.writeHead(200, {...})**: envia headers HTTP
  - `200` = status de sucesso (OK)
  - `'Content-Type': 'text/html'` = tipo de conteúdo é HTML
- **res.end()**: envia a resposta de HTML e encerra a conexão

### 5. Rota /users
```javascript
if (req.url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const users = [
        { name: "Jefferson", age: 32 },
        { name: "Maria Rayssa", age: 29 }
    ];
    res.end(JSON.stringify(users));
}
```
- **Condição**: verifica se a URL é `/users`
- **res.writeHead(200, {...})**: 
  - `200` = status de sucesso
  - `'Content-Type': 'application/json'` = resposta em formato JSON
- **Array de usuários**: cria um array de objetos com informações
- **JSON.stringify()**: converte o objeto JavaScript em string JSON
- **res.end()**: envia os dados e encerra a conexão

### 6. Mensagem e Inicialização
```javascript
const message = `Servidor rodando na porta: ${port}`;

server.listen(port, () => {
    console.log(message);
    console.log('Acesse: http://localhost:8080/home');
});
```
- **server.listen()**: inicia o servidor na porta especificada
- **Callback**: executa quando o servidor está pronto
- Exibe mensagens no console com informações de acesso

## Pontos Importantes

⚠️ **Observação**: Há um erro na mensagem de acesso. O servidor está configurado para a **porta 5324**, mas a mensagem diz para acessar `http://localhost:8080/home`. A URL correta seria `http://localhost:5324/home`.

## Como Testar

Para testar este servidor:
1. Execute: `node http.js`
2. Abra o navegador ou use curl:
   - `curl http://localhost:5324/home` - retorna HTML
   - `curl http://localhost:5324/users` - retorna JSON com usuários

## Conceitos Aprendidos

- ✅ Criação de servidor HTTP com Node.js
- ✅ Roteamento simples baseado em URL
- ✅ Envio de respostas com diferentes tipos (HTML e JSON)
- ✅ Uso de `res.writeHead()` para definir headers HTTP
- ✅ Conversão de dados para JSON com `JSON.stringify()`
