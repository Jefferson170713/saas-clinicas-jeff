# User Model (Schema do Banco de Dados)

## O que é um Schema?

Um **schema** é como um "molde" ou "blueprint" que define a estrutura dos documentos que serão salvos no banco de dados. É como um formulário que especifica quais campos são obrigatórios, qual o tipo de dados de cada campo, etc.

No nosso projeto, usamos o **Mongoose**, uma biblioteca que facilita o trabalho com MongoDB (banco de dados NoSQL). Com o Mongoose, criamos schemas para validar e estruturar nossos dados.

---

## O Schema do Usuário

### Arquivo: `src/models/user.model.js`

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
```

---

## Explicação Detalhada de Cada Parte

### 1. **Importar o Mongoose**
```javascript
const mongoose = require('mongoose');
```
- Importa a biblioteca Mongoose para trabalhar com MongoDB
- É necessária para criar schemas e modelos

---

### 2. **Criando o Schema**
```javascript
const userSchema = new mongoose.Schema({
    // Campos do usuário aqui
});
```
- `mongoose.Schema()` cria um nova estrutura de dados
- Dentro das chaves `{}`, definimos os campos que um usuário terá

---

### 3. **Campos do Schema**

#### **firstName (Primeiro Nome)**
```javascript
firstName: {
    type: String,      // Campo é do tipo texto (String)
    required: true,    // É obrigatório preenchê-lo
}
```
- **type: String** → O valor deve ser texto
- **required: true** → Não é possível criar um usuário sem primeiro nome

#### **lastName (Sobrenome)**
```javascript
lastName: {
    type: String,
    required: true,
}
```
- Mesmo que firstName, é obrigatório

#### **email (E-mail)**
```javascript
email: {
    type: String,
    required: true,
}
```
- Armazena o e-mail do usuário
- Também é obrigatório
- Dica: Você poderia adicionar validação de e-mail aqui: `match: /.+\@.+\..+/`

#### **password (Senha)**
```javascript
password: {
    type: String,
    required: true,
    minlength: 7,
}
```
- **type: String** → Armazena a senha como texto
- **required: true** → Senha é obrigatória
- **minlength: 7** → A senha deve ter no mínimo 7 caracteres de comprimento

---

### 4. **Criando o Modelo**
```javascript
const UserModel = mongoose.model('User', userSchema);
```
- Cria um modelo chamado 'User' baseado no schema definido
- O Mongoose criará automaticamente uma coleção no banco de dados chamada 'users' (plural e minúscula)
- Este modelo é que usaremos para criar, ler, atualizar e deletar usuários

---

### 5. **Exportando o Modelo**
```javascript
module.exports = UserModel;
```
- Exporta o modelo para que outros arquivos do projeto possam usar
- Você pode importar em outro arquivo assim: `const UserModel = require('./src/models/user.model');`

---

## Como Usar o Model

### Criar um novo usuário
```javascript
const UserModel = require('./src/models/user.model');

const novoUsuario = new UserModel({
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@email.com',
    password: 'senha123'
});

// Salvar no banco de dados
await novoUsuario.save();
```

### Buscar usuários
```javascript
// Buscar todos os usuários
const todosUsuarios = await UserModel.find();

// Buscar por e-mail específico
const usuario = await UserModel.findOne({ email: 'joao@email.com' });
```

### Atualizar um usuário
```javascript
await UserModel.updateOne(
    { email: 'joao@email.com' },
    { firstName: 'João Pedro' }
);
```

### Deletar um usuário
```javascript
await UserModel.deleteOne({ email: 'joao@email.com' });
```

---

## Tipos de Dados Disponíveis no Mongoose

| Tipo | Exemplo | Descrição |
|------|---------|-----------|
| **String** | `type: String` | Texto |
| **Number** | `type: Number` | Números inteiros ou decimais |
| **Boolean** | `type: Boolean` | Verdadeiro ou Falso |
| **Date** | `type: Date` | Data e hora |
| **Array** | `type: [String]` | Lista de valores |
| **Object** | `type: Object` | Objeto com múltiplas propriedades |

---

## Propriedades de Validação Úteis

| Propriedade | Exemplo | O que faz |
|-------------|---------|----------|
| **required** | `required: true` | Campo obrigatório |
| **minlength** | `minlength: 7` | Comprimento mínimo (para Strings) |
| **maxlength** | `maxlength: 50` | Comprimento máximo (para Strings) |
| **min** | `min: 0` | Valor mínimo (para Numbers) |
| **max** | `max: 100` | Valor máximo (para Numbers) |
| **unique** | `unique: true` | Valor deve ser único (ex: e-mail) |
| **default** | `default: 'Admin'` | Valor padrão se não preenchido |
| **match** | `match: /.+@.+/` | Validação com expressão regular |

---

## Melhorias Sugeridas para o Schema

Você poderia melhorar o schema adicionando mais validações:

```javascript
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Primeiro nome é obrigatório'],
        trim: true,  // Remove espaços em branco
    },
    lastName: {
        type: String,
        required: [true, 'Sobrenome é obrigatório'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        unique: true,  // E-mail não pode se repetir
        lowercase: true,  // Converte para minúscula
        match: [/.+\@.+\..+/, 'Por favor use um e-mail válido']  // Valida formato
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [7, 'Senha deve ter no mínimo 7 caracteres'],
        select: false  // Não retorna senha por padrão nas buscas
    },
    createdAt: {
        type: Date,
        default: Date.now  // Data de criação automática
    }
});
```

---

## Resumo

- **Schema** = estrutura/molde do banco de dados
- **Mongoose** = biblioteca para facilitar o trabalho com MongoDB
- **Model** = objeto que usamos para interagir com os dados
- **Validações** = garantem que os dados salvos estejam corretos

Com o schema bem definido, você garante que seus dados sempre estarão dentro do padrão esperado! 🎯
