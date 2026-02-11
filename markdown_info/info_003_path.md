# 🛤️ Guia Completo: Módulo Path do Node.js

## O que é o Módulo Path?

O módulo `path` do Node.js é uma **ferramenta para manipular caminhos de arquivos e diretórios**. Ele funciona em qualquer sistema operacional (Windows, Mac, Linux) sem você se preocupar com as diferenças.

```javascript
const path = require("path");
```

---

## 🤔 Por que é Importante Aprender sobre Paths?

### Problema sem o Path:

Se você tentar concatenar caminhos manualmente:
```javascript
// ❌ ERRADO - Funciona no Linux, mas quebra no Windows
const filePath = "/home/user/project/file.js";
```

### Solução com o Path:

```javascript
// ✅ CORRETO - Funciona em qualquer sistema
const filePath = path.join("/home/user/project", "file.js");
```

**Motivo:**
- Windows usa `\` (barra invertida)
- Linux/Mac usa `/` (barra normal)
- O módulo `path` escolhe automaticamente o separador certo

---

## 📍 Variáveis Especiais do Node.js

Antes de entender as funções, você precisa conhecer:

### `__dirname`
Armazena o **caminho completo da pasta atual** do arquivo
```javascript
// Se o arquivo está em: /home/user/meuProjeto/modules/path.js
console.log(__dirname); // /home/user/meuProjeto/modules
```

### `__filename`
Armazena o **caminho completo do arquivo atual** (incluindo o nome)
```javascript
// Se o arquivo está em: /home/user/meuProjeto/modules/path.js
console.log(__filename); // /home/user/meuProjeto/modules/path.js
```

### `process.cwd()`
Retorna o **diretório onde o Node.js foi executado** (pode ser diferente de `__dirname`)
```bash
# Se você está em /home/user/meuProjeto
node modules/path.js

console.log(__dirname);      // /home/user/meuProjeto/modules
console.log(process.cwd());   // /home/user/meuProjeto
```

---

## 🔧 Funções Principais do Path

### 1. **path.join()**
**O que faz:** Une pedaços de caminho em um único caminho, normalizando separadores

```javascript
const path = require("path");

// Exemplo 1: Juntar caminhos
const filePath = path.join(__dirname, "person.js");
console.log(filePath);
// Resultado: /home/user/meuProjeto/modules/person.js

// Exemplo 2: Múltiplos segmentos
const fullPath = path.join("/home", "user", "projeto", "arquivo.txt");
console.log(fullPath);
// Resultado: /home/user/projeto/arquivo.txt

// Exemplo 3: Com .. (ir para pasta anterior)
const parentPath = path.join("/home/user/projeto/src", "..", "arquivo.js");
console.log(parentPath);
// Resultado: /home/user/projeto/arquivo.js

// Exemplo 4: No Windows, funciona perfeitamente
const windowsPath = path.join("C:\\Users\\User\\Desktop", "arquivo.txt");
console.log(windowsPath);
// Resultado: C:\Users\User\Desktop\arquivo.txt (automaticamente ajustado)
```

**Quando usar:** Quando você quer juntar caminhos de forma segura

---

### 2. **path.basename()**
**O que faz:** Extrai **apenas o nome do arquivo** de um caminho completo

```javascript
const path = require("path");

// Exemplo 1: Pegar nome do arquivo atual
const nameFile = path.basename(__filename);
console.log(nameFile);
// Resultado: path.js

// Exemplo 2: Extrair nome de um caminho qualquer
const name1 = path.basename("/home/user/projeto/index.js");
console.log(name1);
// Resultado: index.js

// Exemplo 3: Remover a extensão também
const name2 = path.basename("/home/user/projeto/index.js", ".js");
console.log(name2);
// Resultado: index (o .js foi removido)

// Exemplo 4: Com diferentes tipos de arquivo
const name3 = path.basename("/documents/curriculo.pdf");
console.log(name3);
// Resultado: curriculo.pdf

// Exemplo 5: Pegar nome sem extensão
const nameWithoutExt = path.basename("/images/foto.png", ".png");
console.log(nameWithoutExt);
// Resultado: foto
```

**Quando usar:** Quando você precisa apenas do nome do arquivo

---

### 3. **path.dirname()**
**O que faz:** Extrai **apenas a pasta (diretório)** de um caminho completo

```javascript
const path = require("path");

// Exemplo 1: Pegar diretório do arquivo atual
const nameDir = path.dirname(__dirname);
console.log(nameDir);
// Se __dirname é /home/user/meuProjeto/modules
// Resultado: /home/user/meuProjeto (pasta anterior)

// Exemplo 2: Extrair pasta de um caminho qualquer
const dir1 = path.dirname("/home/user/projeto/arquivo.js");
console.log(dir1);
// Resultado: /home/user/projeto

// Exemplo 3: Subir múltiplos níveis
const dir2 = path.dirname("/home/user/projeto/src/utils/helpers.js");
console.log(dir2);
// Resultado: /home/user/projeto/src/utils

// Exemplo 4: Com apenas um nível
const dir3 = path.dirname("/arquivo.txt");
console.log(dir3);
// Resultado: /

// Exemplo 5: Pegar só a primeira pasta
const dir4 = path.dirname("dados/usuarios/lista.json");
console.log(dir4);
// Resultado: dados/usuarios
```

**Quando usar:** Quando você precisa apenas da pasta/diretório

---

### 4. **path.extname()**
**O que faz:** Extrai **apenas a extensão do arquivo** (incluindo o ponto)

```javascript
const path = require("path");

// Exemplo 1: Pegar extensão do arquivo atual
const nameExt = path.extname(__filename);
console.log(nameExt);
// Resultado: .js

// Exemplo 2: Diferentes tipos de arquivo
const ext1 = path.extname("/home/user/foto.png");
console.log(ext1);
// Resultado: .png

const ext2 = path.extname("/documentos/curriculo.pdf");
console.log(ext2);
// Resultado: .pdf

const ext3 = path.extname("/dados/usuarios.json");
console.log(ext3);
// Resultado: .json

// Exemplo 3: Arquivo sem extensão
const ext4 = path.extname("/home/user/Dockerfile");
console.log(ext4);
// Resultado: (string vazia)

// Exemplo 4: Arquivo com múltiplos pontos
const ext5 = path.extname("/backup/database.backup.sql");
console.log(ext5);
// Resultado: .sql (pega só a última extensão)

// Exemplo 5: Usar para validação (é um arquivo .js?)
const filePath = "/projetos/main.js";
if (path.extname(filePath) === ".js") {
  console.log("É um arquivo JavaScript!");
}
```

**Quando usar:** Quando você precisa verificar o tipo de arquivo

---

### 5. **path.parse()**
**O que faz:** Separa um caminho em **todas as suas partes** (objeto)

```javascript
const path = require("path");

// Exemplo 1: Analisar um caminho completo
const parsed = path.parse(__filename);
console.log(parsed);
/* Resultado:
{
  root: '/',
  dir: '/home/user/meuProjeto/modules',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
*/

// Exemplo 2: Diferentes caminhos
const result1 = path.parse("/home/user/projeto/index.js");
console.log(result1);
/* Resultado:
{
  root: '/',
  dir: '/home/user/projeto',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/

// Exemplo 3: Caminho relativo
const result2 = path.parse("src/utils/helpers.js");
console.log(result2);
/* Resultado:
{
  root: '',
  dir: 'src/utils',
  base: 'helpers.js',
  ext: '.js',
  name: 'helpers'
}
*/

// Exemplo 4: Apenas um arquivo
const result3 = path.parse("arquivo.txt");
console.log(result3);
/* Resultado:
{
  root: '',
  dir: '',
  base: 'arquivo.txt',
  ext: '.txt',
  name: 'arquivo'
}
*/

// Exemplo 5: Usar os dados extraídos
const filePath = "/documentos/relatorio.pdf";
const parts = path.parse(filePath);

console.log(`Pasta: ${parts.dir}`);         // /documentos
console.log(`Nome: ${parts.name}`);         // relatorio
console.log(`Extensão: ${parts.ext}`);      // .pdf
console.log(`Arquivo completo: ${parts.base}`); // relatorio.pdf
```

**Quando usar:** Quando você precisa de todas as partes de um caminho

---

### 6. **path.format()**
**O que faz:** O **oposto de `parse()`** - monta um caminho a partir de um objeto

```javascript
const path = require("path");

// Exemplo 1: Montar um caminho a partir de partes
const pathObj = {
  root: '/',
  dir: '/home/user/projeto',
  base: 'arquivo.js'
};
const fullPath = path.format(pathObj);
console.log(fullPath);
// Resultado: /home/user/projeto/arquivo.js

// Exemplo 2: Modificar apenas uma parte
const original = path.parse("/home/user/projeto/dados.json");
original.name = "backup";  // Muda de "dados" para "backup"
const newPath = path.format(original);
console.log(newPath);
// Resultado: /home/user/projeto/backup.json

// Exemplo 3: Criar um novo caminho do zero
const custom = {
  root: '/',
  dir: '/home/user',
  base: 'meuArquivo.txt'
};
const result = path.format(custom);
console.log(result);
// Resultado: /home/user/meuArquivo.txt
```

**Quando usar:** Quando você quer montar um caminho a partir de partes

---

### 7. **path.resolve()**
**O que faz:** Resolve um caminho **relativo para absoluto** da raiz do sistema

```javascript
const path = require("path");

// Exemplo 1: Transformar em caminho absoluto
const absolute = path.resolve("arquivo.js");
console.log(absolute);
// Resultado: /home/user/meuProjeto/arquivo.js (caminho completo da raiz)

// Exemplo 2: Com múltiplos segmentos
const resolved = path.resolve("src", "utils", "helpers.js");
console.log(resolved);
// Resultado: /home/user/meuProjeto/src/utils/helpers.js

// Exemplo 3: Ignorar partes anteriores
const result = path.resolve("/home/user", "projeto", "../arquivo.txt");
console.log(result);
// Resultado: /home/arquivo.txt

// Exemplo 4: Usar com __dirname
const moduleFile = path.resolve(__dirname, "pessoa.js");
console.log(moduleFile);
// Resultado: /home/user/meuProjeto/modules/pessoa.js

// Exemplo 5: Resolver ".."
const parentDir = path.resolve(__dirname, "..", "index.js");
console.log(parentDir);
// Resultado: /home/user/meuProjeto/index.js
```

**Quando usar:** Quando você quer ter certeza que tem o caminho absoluto completo

---

## 📊 Comparação das Funções

| Função | Input | Output | Exemplo |
|--------|-------|--------|---------|
| `basename()` | `/home/user/arquivo.js` | `arquivo.js` | Nome do arquivo |
| `dirname()` | `/home/user/arquivo.js` | `/home/user` | Pasta do arquivo |
| `extname()` | `/home/user/arquivo.js` | `.js` | Extensão do arquivo |
| `join()` | `"/home/user"`, `"arquivo.js"` | `/home/user/arquivo.js` | Juntar caminhos |
| `parse()` | `/home/user/arquivo.js` | `{ root, dir, base, ext, name }` | Separar em partes |
| `format()` | `{ root, dir, base... }` | `/home/user/arquivo.js` | Montar caminho |
| `resolve()` | `"arquivo.js"` | `/home/user/meuProjeto/arquivo.js` | Transformar em absoluto |

---

## 🎯 Casos de Uso Práticos

### Caso 1: Salvar um backup do arquivo atual
```javascript
const path = require("path");

const caminhoAtual = __filename;
const diretorio = path.dirname(caminhoAtual);
const nomeArquivo = path.basename(caminhoAtual, path.extname(caminhoAtual));
const extensao = path.extname(caminhoAtual);

const caminhoBackup = path.join(diretorio, `${nomeArquivo}.backup${extensao}`);
console.log(caminhoBackup);
// Resultado: /home/user/meuProjeto/modules/path.backup.js
```

### Caso 2: Processar só arquivos JavaScript
```javascript
const path = require("path");

function ehArquivoJS(caminho) {
  return path.extname(caminho) === ".js";
}

console.log(ehArquivoJS("index.js"));      // true
console.log(ehArquivoJS("style.css"));     // false
console.log(ehArquivoJS("dados.json"));    // false
```

### Caso 3: Deixar caminho pronto para usar
```javascript
const path = require("path");

// Em vez de contar com caminhos relativos:
// const arquivo = "../dados/usuarios.json"; // ❌ Pode não funcionar

// Use path.resolve:
const arquivo = path.resolve(__dirname, "../dados/usuarios.json"); // ✅ Sempre funciona
```

### Caso 4: Extrair informações de um arquivo
```javascript
const path = require("path");

function analisarArquivo(caminhoCompleto) {
  const info = path.parse(caminhoCompleto);
  
  return {
    pasta: info.dir,
    nomeArquivo: info.base,
    nomeSeExtensao: info.name,
    extensao: info.ext
  };
}

const resultado = analisarArquivo("/documentos/relatorio.pdf");
console.log(resultado);
// {
//   pasta: '/documentos',
//   nomeArquivo: 'relatorio.pdf',
//   nomeSeExtensao: 'relatorio',
//   extensao: '.pdf'
// }
```

### Caso 5: Construir caminho dinâmico
```javascript
const path = require("path");

function criarCaminhoArquivo(usuario, tipo, nomeArquivo) {
  return path.join(
    __dirname,
    "..",
    "dados",
    usuario,
    tipo,
    nomeArquivo
  );
}

const caminho = criarCaminhoArquivo("jefferson", "documentos", "curriculo.pdf");
console.log(caminho);
// /home/user/meuProjeto/dados/jefferson/documentos/curriculo.pdf
```

---

## ⚠️ Pontos Importantes para Lembrar

✅ **Use `path.join()` ou `path.resolve()`** para juntar caminhos (nunca concatene com `+`)

✅ **Use `path.basename()`, `path.dirname()`, `path.extname()`** para extrair partes

✅ **Use `path.parse()`** quando precisar de TODAS as partes

✅ **Use `path.resolve()`** quando precisar de um caminho absoluto garantido

❌ **Não use concatenação manual:** `"/home/" + usuario + "/arquivo.js"`

❌ **Não assuma o separador:** Windows usa `\`, Linux usa `/`

---

## 🚀 Resumo Rápido

```javascript
const path = require("path");

// Juntar caminhos
const filePath = path.join(__dirname, "arquivo.js");

// Extrair nome do arquivo
const nome = path.basename(filePath);

// Extrair pasta
const pasta = path.dirname(filePath);

// Extrair extensão
const ext = path.extname(filePath);

// Separar em partes
const partes = path.parse(filePath);

// Montar a partir de partes
const novo = path.format(partes);

// Transformar em caminho absoluto
const absoluto = path.resolve("arquivo.js");
```

---

**Criado para: Aprendizado e Documentação**
**Data de Criação:** Fevereiro 2026
