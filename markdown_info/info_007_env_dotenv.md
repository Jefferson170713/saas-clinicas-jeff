# Variáveis de Ambiente e `.env`

Ao desenvolver aplicações, especialmente aquelas que se conectam a serviços externos (como bancos de dados), é comum ter **dados sensíveis** — credenciais, chaves de API, URIs de conexão etc. Esses valores não devem ser hard‑coded no código porque:

1.  Eles variam entre ambientes (desenvolvimento, produção, testes).
2.  Expor esses valores no repositório pode comprometer a segurança.

## 1. Criando o banco de dados no MongoDB Atlas

Antes de usar o MongoDB na aplicação, foi necessário criar uma conta no site oficial do MongoDB Atlas:

- Acesse https://cloud.mongodb.com/ e registre‑se (gratuitamente, se desejar).
- Crie um **cluster** (o serviço de banco de dados gerenciado).
- Adicione um usuário no painel de segurança e configure uma senha.
- Opcionalmente, libere o IP do seu computador para permitir conexões.
- Ao final, copie a **string de conexão** (URI) — ela será algo como:
  `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority`.

Essas informações (usuário, senha, nome do cluster) são **sensíveis** e não devem ir para o código.

## 2. Dependências no `package.json`

No `package.json` do projeto, instalamos os pacotes necessários:

```bash
npm install mongodb mongoose dotenv
```

- `mongodb` é o driver oficial.
- `mongoose` é um ORM/ODM que facilita modelagem e consultas.
- `dotenv` permite carregar variáveis de ambiente a partir de um arquivo local `.env`.

Os pacotes aparecem em `dependencies` e ficam registrados no `package.json` automaticamente.

## 3. Arquivo `.env` e como usá‑lo

O `.env` é um arquivo de texto simples na raiz do projeto onde colocamos pares `CHAVE=valor`. Por exemplo:

```env
MONGODB_USERNAME=jefferson_db_user
MONGODB_PASSWORD=5wKrDv11TOIRJAqd
MONGODB_CLUSTER_NAME=cluster-jefferson-saas
PORT=3000
```

> **Importante:** nunca compartilhe este arquivo! Ele contém credenciais reais. Em produção, valores dessas variáveis podem ser definidos no ambiente do servidor em vez de `.env`.

No código, usamos `dotenv` no início da aplicação (por exemplo em `index.js`):

```js
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.esswxom.mongodb.net/?retryWrites=true&w=majority`;
// ...usar uri para conectar via mongoose
```

O `dotenv.config()` lê o `.env` e adiciona as chaves a `process.env`.

## 4. `.gitignore` e segurança

Para evitar que o `.env` entre no controle de versão, ele deve ser listado no arquivo `.gitignore`:

```
# Node modules
node_modules/

# environment variables
.env
```

Dessa forma, `git status` não mostrará o `.env` e ele não será enviado ao repositório remoto.

Também é comum adicionar um arquivo de exemplo (`.env.example` ou `.env.sample`) com chaves vazias ou fictícias, para que outros desenvolvedores saibam quais variáveis precisam definir.

## 5. Outras considerações e boas práticas

- **Não comitar credenciais**: Se algum valor vazar, gere novas credenciais imediatamente (ex.: senha do MongoDB).
- **Variáveis diferentes por ambiente**: Em produção/CI/CD, configure as variáveis diretamente no serviço (Heroku, Vercel, Docker, etc.) sem usar `.env`.
- **Documentação**: Mantenha este arquivo `info_007_env_dotenv.md` atualizado com instruções de como adicionar novas chaves e o propósito de cada uma.

---

Com essa documentação, qualquer pessoa que clonar o repositório saberá como configurar o ambiente localmente e entenderá o motivo de não incluir o `.env` no controle de versão. 