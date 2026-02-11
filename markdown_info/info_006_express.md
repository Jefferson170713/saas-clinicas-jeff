# Módulo Express - Framework Web

## Visão Geral
O arquivo `express.js` cria um servidor web usando o framework **Express.js**, uma abstração de alto nível sobre o módulo HTTP nativo do Node.js. Este servidor implementa as mesmas funcionalidades do exemplo anterior, mas de forma mais limpa e elegante.

## Análise do Código

### 1. Importação do Express
```javascript
const express = require('express');
```
- Importa o framework Express.js
- Express simplifica a criação de servidores web e o roteamento

### 2. Configuração da Porta
```javascript
const port = 5324;
```
- Define a porta em que o servidor irá ouvir
- Mesma porta utilizada no exemplo anterior: **5324**

### 3. Instanciação da Aplicação
```javascript
const app = express();
```
- Cria uma nova instância da aplicação Express
- Esta instância (`app`) será usada para definir rotas e iniciar o servidor

### 4. Rota GET /home
```javascript
app.get('/home', (req, res) => {
    res.status(200).send("<h1>Testtando uma home page com express</h1>");
})
```
- **app.get()**: define uma rota HTTP GET para `/home`
- **Callback (req, res)**: 
  - `req` = objeto da requisição
  - `res` = objeto da resposta
- **res.status(200)**: define o código de status HTTP (200 = sucesso)
- **res.send()**: envia a resposta (detecta automaticamente o tipo de conteúdo)

### 5. Rota GET /users
```javascript
app.get('/users', (req, res) => {
    const users = [
        { name: "Jefferson", age: 32 },
        { name: "Maria Rayssa", age: 29 }
    ];
    res.status(200).json(users);
});
```
- **app.get()**: define uma rota HTTP GET para `/users`
- **Array de usuários**: cria um array com dados dos usuários
- **res.status(200)**: define o código de status como sucesso
- **res.json()**: envia a resposta em formato JSON automaticamente
  - Adiciona header `Content-Type: application/json` automaticamente
  - Converte o objeto para JSON internamente

### 6. Inicialização do Servidor
```javascript
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}/home`);
});
```
- **app.listen()**: inicia o servidor na porta especificada
- **Callback**: executa quando o servidor está pronto
- Exibe mensagens corretas com a porta correta no console
- Usa template literals para inserir a porta dinamicamente

## Comparação: HTTP vs Express

| Aspecto | HTTP Nativo | Express |
|---------|-------------|---------|
| **Importação** | `require('http')` | `require('express')` |
| **Headers** | Manual com `writeHead()` | Automático com `status()` |
| **Envio de HTML** | `res.end()` | `res.send()` |
| **Envio de JSON** | `JSON.stringify()` + `res.end()` | `res.json()` |
| **Verificação de URL** | `if (req.url === '/home')` | `app.get('/home', ...)` |
| **Legibilidade** | Mais verboso | Mais conciso |
| **Manutenibilidade** | Menor | Maior |

## Vantagens do Express

✅ **Sintaxe mais limpa**: Roteamento explícito com `app.get()` ao invés de `if` statements
✅ **Menos código**: Express cuida de headers e conversões automaticamente
✅ **Mais funcionalidades**: Suporta middleware, validação, compressão, etc.
✅ **Melhor escalabilidade**: Ideal para projetos maiores e mais complexos
✅ **Mensagens corretas**: A URL exibida no console está correta

## Conceitos Principais do Express

### Métodos HTTP
- `app.get()` - para requisições GET
- `app.post()` - para requisições POST
- `app.put()` - para requisições PUT
- `app.delete()` - para requisições DELETE

### Objetos Principais
- **req** (Request): contém dados da requisição
- **res** (Response): usado para enviar respostas

### Métodos Comuns de Resposta
- `res.send()` - envia qualquer tipo de resposta
- `res.json()` - envia resposta em JSON
- `res.status()` - define código de status HTTP
- `res.redirect()` - redireciona para outra URL

## Como Testar

Para testar este servidor:
1. Execute: `node express.js`
2. Use curl ou navegador:
   - `curl http://localhost:5324/home` - retorna HTML
   - `curl http://localhost:5324/users` - retorna JSON com usuários

## Conceitos Aprendidos

- ✅ Framework Express para criação de servidores
- ✅ Roteamento explícito com `app.get()`
- ✅ Métodos simplificados para envio de respostas
- ✅ Diferença entre `res.send()` e `res.json()`
- ✅ Vantagens do Express sobre HTTP nativo
- ✅ Melhor organização e legibilidade de código
