# 📦 Guia Completo: Arquivo package.json

## O que é o `package.json`?

O `package.json` é o **arquivo de configuração principal de um projeto Node.js**. Ele contém todas as informações sobre o projeto, como:
- Nome do projeto
- Versão
- Descrição
- Dependências (bibliotecas que o projeto precisa)
- Scripts de execução
- Autor e licença

É como um "documento de identidade" do seu projeto que te ajuda a gerenciar tudo que você precisa para que o código funcione.

---

## 🚀 Como Executar o Projeto

Existem várias maneiras de executar aplicações Node.js:

### 1. **Execução Direta**
```bash
node index.js
```
Executa o arquivo `index.js` uma única vez e encerra após terminar.

### 2. **Usando Scripts Definidos no `package.json`**
```bash
npm start
npm run dev
npm run test
```

Esses scripts são definidos na seção `"scripts"` do `package.json`. Exemplo:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "echo 'Teste executado'"
}
```

### 3. **Com Ferramentas como Nodemon (Desenvolvimento)**
```bash
npm run dev
```
Para desenvolvimento, usamos `nodemon` que reinicia automaticamente o servidor quando há alterações nos arquivos.

---

## 📋 Estrutura Básica do `package.json`

```json
{
  "name": "saas-clinicas-jeff",
  "version": "1.0.0",
  "description": "Projeto de clínicas SaaS",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": ["clinica", "saas", "nodejs"],
  "author": "Jefferson",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🔧 Dependências vs DevDependências

### **dependencies**
São bibliotecas **necessárias para a produção**. O código depende delas para funcionar.
- Express (framework web)
- Banco de dados
- Utilitários

Instalação:
```bash
npm install express
```

### **devDependencies**
São ferramentas **apenas para desenvolvimento**. Não são necessárias quando o projeto está rodando em produção.
- Nodemon (reinicia servidor automaticamente)
- ESLint (verifica código)
- Jest (testes)

Instalação:
```bash
npm install --save-dev nodemon
```

---

## 📚 Exemplo Prático: Instalando Nodemon

### Por que Instalamos Nodemon?
Quando desenvolvemos, constantemente fazemos alterações no código. A cada mudança, é chato ter que:
1. Parar o servidor (Ctrl + C)
2. Executar `node index.js` novamente
3. Ver a mudança funcionando

**Nodemon resolve isso!** Ele monitora os arquivos e reinicia automaticamente quando detecta alterações.

### Como Instalamos Nodemon

**Comando:**
```bash
npm install --save-dev nodemon
```

**O que cada parte significa:**
- `npm install` - comando para instalar pacotes
- `--save-dev` - marca como dependência de desenvolvimento (não vai para produção)
- `nodemon` - o nome do pacote a instalar

### O que Acontece Após a Instalação

1. **Arquivo `node_modules/` é criado/atualizado**
   - Pasta contendo todo o código-fonte do nodemon e suas dependências
   - NÃO deve ser enviado ao Git (por isso existe `.gitignore`)

2. **Arquivo `package-lock.json` é atualizado**
   - Registra exatamente qual versão foi instalada
   - Garante que todos usem a mesma versão

3. **Arquivo `package.json` é atualizado**
   ```json
   "devDependencies": {
     "nodemon": "^3.0.1"
   }
   ```
   - O `^` significa que aceita atualizações menores automaticamente

### Configurando para Usar Nodemon

No `package.json`, adicione um script no `scripts`:
```json
"scripts": {
  "dev": "nodemon index.js"
}
```

Agora execute:
```bash
npm run dev
```

**Resultado:** Seu servidor agora reinicia automaticamente toda vez que você salva um arquivo!

---

## 📂 Arquivos Importantes Gerados

### 1. **node_modules/** (Pasta)
- Contém todas as bibliotecas instaladas
- Muito grande (pode ter milhões de arquivos)
- **Não incluir no Git** - regenerada com `npm install`

### 2. **package-lock.json** (Arquivo)
- Congela as versões exatas instaladas
- Importante para trabalho em equipe
- Deve estar no Git

### 3. **package.json** (Arquivo)
- Lista de dependências do projeto
- Scripts de execução
- Informações do projeto

---

## 🎯 Fluxo Típico de Instalação de Dependências

```
1. Você cria um novo projeto
   └─> npm init -y

2. Instala dependências de produção
   └─> npm install express

3. Instala dependências de desenvolvimento
   └─> npm install --save-dev nodemon

4. Configura scripts no package.json
   └─> Adiciona "dev": "nodemon index.js"

5. Executa o servidor
   └─> npm run dev

6. Faz alterações no código
   └─> Salva o arquivo (Ctrl + S)

7. Nodemon detecta a mudança
   └─> Reinicia o servidor automaticamente

8. Vê a mudança funcionando
   └─> Sem precisar parar e executar novamente!
```

---

## ⚠️ Pontos Importantes para Lembrar

✅ **Sempre commitar:**
- `package.json`
- `package-lock.json`

❌ **Nunca commitar:**
- `node_modules/` (coloca no `.gitignore`)

📝 **Para colaboradores:**
- Quando alguém clonar seu projeto, executa `npm install`
- Isso lê o `package.json` e baixa todas as dependências

🔄 **Atualizar dependências:**
- `npm update` - atualiza para versões compatíveis
- `npm outdated` - mostra quais estão desatualizadas

---

## 🔍 Como Verificar o que Está Instalado

```bash
# Lista todas as dependências instaladas
npm list

# Mostra apenas as de produção
npm list --only=prod

# Mostra apenas as de desenvolvimento
npm list --only=dev

# Verifica dependências desatualizadas
npm outdated
```

---

## 📝 Próximos Passos

Conforme o projeto avança, iremos adicionar mais:
- Explicações sobre Express
- Como criar rotas
- Conectar ao banco de dados
- Variáveis de ambiente (`.env`)
- Deployment em produção

---

**Criado para: Aprendizado e Documentação**
**Data de Criação:** Fevereiro 2026
