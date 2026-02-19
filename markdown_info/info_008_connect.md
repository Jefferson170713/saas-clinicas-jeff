# Estrutura do Banco e `connect.js`

Nesta aplicação SaaS a organização das pastas segue um padrão simples e escalável:

```
src/
├── database/
│   └── connect.js    # lógica de conexão com o MongoDB
└── ...              # outros módulos e features da aplicação
```

- **`src/`**: contém todo o código-fonte da aplicação.
- **`src/database/`**: dedicado a arquivos relacionados à persistência de dados e inicialização do banco de dados. Se futuramente surgir a necessidade de modelos (schemas), migrações ou utilitários de DB, eles também viveriam aqui.

## O que faz `connect.js`

O arquivo `src/database/connect.js` exporta uma função assincrona que estabelece a
conexão com o MongoDB usando o mongoose. Ele foi separado em seu próprio módulo para
manter o código modular e facilitar o reuso em diferentes pontos da aplicação (por
exemplo, durante testes ou em um script de inicialização).

```js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterName = process.env.MONGODB_CLUSTER_NAME;
    const stringConnection = `mongodb+srv://${username}:${password}@${clusterName}.esswxom.mongodb.net/?appName=${clusterName}`;
    
    try {
        await mongoose.connect(stringConnection);
        console.log('Conexão bem-sucedida à base de dados');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectToDatabase;
```

### Passo a passo do código

1. Importa `mongoose`, que é a biblioteca escolhida para manipular o MongoDB.
2. Lê as credenciais e nome do cluster da variáveis de ambiente (definidas no `.env`).
3. Monta a string de conexão usando `mongodb+srv://` e o template fornecido pelo Atlas.
4. Tenta conectar chamando `mongoose.connect(...)`.
   - Em caso de sucesso, exibe mensagem no console.
   - Em caso de erro, captura e loga a falha.
5. Exporta a função para que outras partes da aplicação a invoquem (geralmente no
   arquivo principal `index.js` antes de iniciar o servidor HTTP).

### Utilização típica

No arquivo de entrada da aplicação (`index.js` ou similar):

```js
require('dotenv').config();
const connectToDatabase = require('./src/database/connect');

(async () => {
  await connectToDatabase();
  // iniciar servidor express, rotas, etc.
})();
```

### Problemas comuns

Ao conectar com o MongoDB Atlas você pode encontrar erros como o seguinte:

```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

Isso acontece porque o Atlas, por padrão, **bloqueia conexões de IPs não autorizados**.
Para resolver:

1. Acesse https://cloud.mongodb.com/ e navegue até seu cluster.
2. Vá em **Network Access** na barra lateral.
3. Clique em **Add IP Address** e insira o IP da máquina onde o código está
   rodando (no caso de um dev container, use `0.0.0.0/0` para permitir todos os
   endereços temporariamente ou o IP público da sua rede).
4. Salve e aguarde alguns minutos até que a mudança seja propagada.

> 💡 Em ambientes de produção, use regras de firewall mais restritas e evite
> `0.0.0.0/0` a menos que seja estritamente necessário.

Com isso, a conexão deve se estabelecer sem o erro acima.

Com essa documentação, qualquer colaborador entenderá onde a lógica de
conexão fica e como ela é organizada dentro da pasta `src/database`.