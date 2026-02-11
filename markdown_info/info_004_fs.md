# 📁 Guia Completo: Módulo FS (File System) do Node.js

## O que é o Módulo FS?

O módulo `fs` (File System) do Node.js permite **manipular arquivos e pastas do seu computador**. Com ele você pode:
- Criar pastas
- Criar arquivos
- Escrever em arquivos
- Ler arquivos
- Deletar arquivos/pastas
- Renomear arquivos
- E muito mais!

```javascript
const fs = require("fs");
```

---

## 🤔 Por que é Importante?

### Exemplos de Uso:

✅ **Ler configurações** de um arquivo `.json`  
✅ **Salvar dados** que o usuário criou  
✅ **Criar logs** de erros  
✅ **Exportar relatórios** em txt ou csv  
✅ **Fazer backup** de informações  
✅ **Processar múltiplos arquivos** automaticamente  

---

## 📝 Conceito de Callbacks

Antes de falarmos das funções, é importante entender **callbacks**.

### O que é um Callback?

Um callback é uma **função que é executada DEPOIS que algo termina**.

```javascript
// Padrão básico:
fs.operacao(caminhoDoArquivo, (erro, resultado) => {
  if (erro) {
    console.log("Erro: " + erro);
    return;
  }
  console.log("Sucesso: " + resultado);
});
```

**Entendendo:**
- `(erro, resultado) => {...}` é a função callback
- Se houver erro, `erro` terá valor
- Se tudo correr bem, `resultado` terá valor
- **Sempre verificar se há erro primeiro!**

---

## 🔧 Funções Principais do FS

### 1. **fs.mkdir()**
**O que faz:** **Cria uma nova pasta (diretório)**

```javascript
const fs = require("fs");
const path = require("path");

// Exemplo 1: Criar uma pasta simples
fs.mkdir(path.join(__dirname, "/MinhaColeta"), (erro) => {
  if (erro) {
    return console.log("Erro ao criar a pasta: " + erro);
  }
  console.log("Pasta criada com sucesso!");
});

// Exemplo 2: Criar uma pasta com nome de data
const dataAtual = new Date();
const nomePasta = `backup_${dataAtual.toISOString().split('T')[0]}`;
fs.mkdir(path.join(__dirname, nomePasta), (erro) => {
  if (erro) {
    return console.log("Erro: " + erro);
  }
  console.log(`Pasta ${nomePasta} criada!`);
});

// Exemplo 3: Criar com tratamento de erro mais detalhado
fs.mkdir(path.join(__dirname, "/Dados"), (erro) => {
  if (erro) {
    if (erro.code === "EEXIST") {
      console.log("A pasta já existe!");
    } else {
      console.log("Erro desconhecido: " + erro);
    }
    return;
  }
  console.log("Pasta criada!");
});

// Exemplo 4: Criar várias pastas
const pastas = ["usuarios", "logs", "uploads", "backups"];
pastas.forEach((pasta) => {
  fs.mkdir(path.join(__dirname, pasta), (erro) => {
    if (erro && erro.code !== "EEXIST") {
      console.log("Erro: " + erro);
      return;
    }
    console.log(`Pasta '${pasta}' pronta!`);
  });
});

// Exemplo 5: Criar com permissões específicas
fs.mkdir(path.join(__dirname, "/Privado"), 0o700, (erro) => {
  if (erro) {
    console.log("Erro: " + erro);
    return;
  }
  console.log("Pasta criada com permissões 0o700 (apenas proprietário)");
});
```

**Quando usar:** Quando você quer preparar um local para salvar arquivos

---

### 2. **fs.writeFile()**
**O que faz:** **Cria um arquivo e escreve conteúdo nele** (se existir, sobrescreve)

```javascript
const fs = require("fs");
const path = require("path");

// Exemplo 1: Criar arquivo simples
fs.writeFile(path.join(__dirname, "/teste.txt"), "Olá mundo!", (erro) => {
  if (erro) {
    return console.log("Erro ao criar o arquivo: " + erro);
  }
  console.log("Arquivo criado com sucesso!");
});

// Exemplo 2: Criar arquivo com dados estruturados
const dados = "Nome: Jefferson\nEmail: jeff@email.com\nIdade: 30";
fs.writeFile(path.join(__dirname, "/dados.txt"), dados, (erro) => {
  if (erro) {
    console.log("Erro: " + erro);
    return;
  }
  console.log("Arquivo salvo!");
});

// Exemplo 3: Salvar JSON em arquivo
const usuario = {
  nome: "Jefferson",
  email: "jeff@email.com",
  idade: 30
};
fs.writeFile(
  path.join(__dirname, "/usuario.json"),
  JSON.stringify(usuario, null, 2),  // null, 2 = formata bonito
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("JSON salvo!");
  }
);

// Exemplo 4: Usar encoding diferente
fs.writeFile(
  path.join(__dirname, "/acentos.txt"),
  "Maçã, açúcar, pão",
  "utf-8",  // Especifica o tipo de encoding
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Arquivo com acentos salvo!");
  }
);

// Exemplo 5: Criar múltiplos arquivos
const arquivos = [
  { nome: "arquivo1.txt", conteudo: "Conteúdo 1" },
  { nome: "arquivo2.txt", conteudo: "Conteúdo 2" },
  { nome: "arquivo3.txt", conteudo: "Conteúdo 3" }
];

arquivos.forEach((arquivo) => {
  fs.writeFile(
    path.join(__dirname, arquivo.nome),
    arquivo.conteudo,
    (erro) => {
      if (erro) {
        console.log("Erro: " + erro);
        return;
      }
      console.log(`Arquivo '${arquivo.nome}' criado!`);
    }
  );
});

// Exemplo 6: Salvar log com timestamp
const agora = new Date().toLocaleString();
const log = `[${agora}] Aplicação iniciada\n`;
fs.writeFile(
  path.join(__dirname, "/log.txt"),
  log,
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Log salvo!");
  }
);
```

**Quando usar:** Quando você quer criar um arquivo novo ou sobrescrever um existente

**⚠️ Cuidado:** Sobrescreve o arquivo se ele já existir!

---

### 3. **fs.appendFile()**
**O que faz:** **Adiciona conteúdo no final de um arquivo** (não sobrescreve)

```javascript
const fs = require("fs");
const path = require("path");

// Exemplo 1: Adicionar uma linha
fs.appendFile(
  path.join(__dirname, "/teste.txt"),
  "\nOlá amigo, testando adicionar mais conteúdo!",
  (erro) => {
    if (erro) {
      return console.log("Erro ao adicionar conteúdo: " + erro);
    }
    console.log("Conteúdo adicionado com sucesso!");
  }
);

// Exemplo 2: Adicionar com quebra de linha
fs.appendFile(
  path.join(__dirname, "/dados.txt"),
  "\n--- Novo registro adicionado ---",
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Adicionado!");
  }
);

// Exemplo 3: Criar um log acumulativo
const timestamp = new Date().toLocaleString();
const mensagem = `[${timestamp}] Usuário acessou a página\n`;
fs.appendFile(
  path.join(__dirname, "/logs.txt"),
  mensagem,
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
  }
);

// Exemplo 4: Adicionar múltiplas linhas
const dados = "Linha 1\nLinha 2\nLinha 3\n";
fs.appendFile(
  path.join(__dirname, "/relatorio.txt"),
  dados,
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Dados adicionados!");
  }
);

// Exemplo 5: Adicionar em JSON (útil para logs estruturados)
const evento = {
  data: new Date().toISOString(),
  tipo: "login",
  usuario: "jefferson"
};
fs.appendFile(
  path.join(__dirname, "/eventos.json"),
  JSON.stringify(evento) + "\n",
  (erro) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Evento registrado!");
  }
);

// Exemplo 6: Adicionar com verificação de arquivo
const arquivo = path.join(__dirname, "/historico.txt");
fs.appendFile(arquivo, "Novo histórico\n", (erro) => {
  if (erro) {
    if (erro.code === "ENOENT") {
      // Arquivo não existe, criar novo
      fs.writeFile(arquivo, "Novo histórico\n", () => {
        console.log("Arquivo criado e conteúdo adicionado!");
      });
    } else {
      console.log("Erro: " + erro);
    }
    return;
  }
  console.log("Adicionado ao histórico!");
});
```

**Quando usar:** Quando você quer **acumular** dados (logs, histórico, etc)

**✅ Diferença:** Enquanto `writeFile` sobrescreve, `appendFile` adiciona ao final

---

### 4. **fs.readFile()**
**O que faz:** **Lê o conteúdo de um arquivo**

```javascript
const fs = require("fs");
const path = require("path");

// Exemplo 1: Ler arquivo de texto
fs.readFile(
  path.join(__dirname, "/teste.txt"),
  "utf-8",
  (erro, dados) => {
    if (erro) {
      return console.log("Erro ao ler o arquivo: " + erro);
    }
    console.log("Conteúdo do arquivo:\n" + dados);
  }
);

// Exemplo 2: Ler arquivo JSON e converter
fs.readFile(
  path.join(__dirname, "/usuario.json"),
  "utf-8",
  (erro, dados) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    const usuario = JSON.parse(dados);  // Converte string para objeto
    console.log("Nome: " + usuario.nome);
    console.log("Email: " + usuario.email);
  }
);

// Exemplo 3: Ler arquivo sem especificar encoding (retorna Buffer)
fs.readFile(
  path.join(__dirname, "/imagem.png"),
  (erro, dados) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log("Tipo: " + typeof dados);      // object
    console.log("Tamanho: " + dados.length);   // bytes
  }
);

// Exemplo 4: Ler múltiplos arquivos
const arquivos = ["arquivo1.txt", "arquivo2.txt", "arquivo3.txt"];

arquivos.forEach((arquivo) => {
  fs.readFile(
    path.join(__dirname, arquivo),
    "utf-8",
    (erro, dados) => {
      if (erro) {
        console.log(`Erro ao ler ${arquivo}: ` + erro);
        return;
      }
      console.log(`--- Conteúdo de ${arquivo} ---`);
      console.log(dados);
      console.log("");
    }
  );
});

// Exemplo 5: Ler e processar dados
fs.readFile(
  path.join(__dirname, "/numeros.txt"),
  "utf-8",
  (erro, dados) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    // Se o arquivo contém: "10\n20\n30"
    const numeros = dados.split("\n").map(Number);
    const soma = numeros.reduce((a, b) => a + b, 0);
    console.log("Soma: " + soma);  // 60
  }
);

// Exemplo 6: Ler arquivo de configuração
fs.readFile(
  path.join(__dirname, "/config.json"),
  "utf-8",
  (erro, dados) => {
    if (erro) {
      console.log("Usando configurações padrão");
      return;
    }
    try {
      const config = JSON.parse(dados);
      console.log("Configurações carregadas: " + config.nome);
    } catch (e) {
      console.log("Erro ao processar config: " + e.message);
    }
  }
);

// Exemplo 7: Comparar tamanhos de arquivo
fs.readFile(
  path.join(__dirname, "/dados.txt"),
  (erro, dados) => {
    if (erro) {
      console.log("Erro: " + erro);
      return;
    }
    console.log(`Tamanho do arquivo: ${dados.length} bytes`);
    if (dados.length > 1000000) {
      console.log("Arquivo muito grande!");
    }
  }
);
```

**Quando usar:** Quando você quer obter informações de um arquivo

---

## 📊 Resumo das 4 Operações Principais

| Operação | Função | O que faz | Sobrescreve? |
|----------|--------|----------|-------------|
| **Criar pasta** | `fs.mkdir()` | Cria um diretório | - |
| **Criar/Escrever** | `fs.writeFile()` | Cria arquivo ou sobrescreve | ✅ Sim |
| **Addenda** | `fs.appendFile()` | Adiciona ao final | ❌ Não |
| **Ler** | `fs.readFile()` | Lê conteúdo | - |

---

## 🔄 Fluxo Típico de Uso

```
1. Criar uma pasta
   └─> fs.mkdir()

2. Criar um arquivo dentro da pasta
   └─> fs.writeFile()

3. Adicionar mais dados ao arquivo
   └─> fs.appendFile()

4. Ler o arquivo quando precisar dos dados
   └─> fs.readFile()

5. Processar os dados
   └─> JSON.parse(), split(), etc
```

---

## 🎯 Casos de Uso Práticos

### Caso 1: Sistema de Logs Automático
```javascript
const fs = require("fs");
const path = require("path");

function registrarLog(tipo, mensagem) {
  const timestamp = new Date().toLocaleString();
  const log = `[${timestamp}] ${tipo}: ${mensagem}\n`;
  
  fs.appendFile(
    path.join(__dirname, "/logs.txt"),
    log,
    (erro) => {
      if (erro) console.log("Erro ao registrar log: " + erro);
    }
  );
}

// Usar:
registrarLog("INFO", "Aplicação iniciada");
registrarLog("ERRO", "Falha ao conectar ao banco");
registrarLog("SUCESSO", "Usuário criado");
```

### Caso 2: Salvar Dados de Usuário
```javascript
const fs = require("fs");
const path = require("path");

function salvarUsuario(usuario) {
  const pastaUsuarios = path.join(__dirname, "/usuarios");
  
  // Criar pasta se não existir
  fs.mkdir(pastaUsuarios, () => {
    // Salvar arquivo JSON
    fs.writeFile(
      path.join(pastaUsuarios, `${usuario.id}.json`),
      JSON.stringify(usuario, null, 2),
      (erro) => {
        if (erro) {
          console.log("Erro ao salvar: " + erro);
          return;
        }
        console.log(`Usuário ${usuario.id} salvo!`);
      }
    );
  });
}

// Usar:
const novoUsuario = {
  id: 1,
  nome: "Jefferson",
  email: "jeff@email.com"
};
salvarUsuario(novoUsuario);
```

### Caso 3: Fazer Backup de Arquivo
```javascript
const fs = require("fs");
const path = require("path");

function fazerBackup(caminhoOriginal) {
  fs.readFile(caminhoOriginal, (erro, dados) => {
    if (erro) {
      console.log("Erro ao ler original: " + erro);
      return;
    }
    
    const extensao = path.extname(caminhoOriginal);
    const nomeSemExtensao = path.basename(caminhoOriginal, extensao);
    const dataBackup = new Date().toISOString().split('T')[0];
    const caminhoBackup = path.join(
      path.dirname(caminhoOriginal),
      `${nomeSemExtensao}_backup_${dataBackup}${extensao}`
    );
    
    fs.writeFile(caminhoBackup, dados, (erro) => {
      if (erro) {
        console.log("Erro ao fazer backup: " + erro);
        return;
      }
      console.log("Backup criado: " + caminhoBackup);
    });
  });
}

// Usar:
fazerBackup(path.join(__dirname, "/dados.txt"));
```

### Caso 4: Ler Configurações na Inicialização
```javascript
const fs = require("fs");
const path = require("path");

function carregarConfig() {
  const caminhoConfig = path.join(__dirname, "/config.json");
  
  fs.readFile(caminhoConfig, "utf-8", (erro, dados) => {
    if (erro) {
      console.log("Config não encontrada, usando padrões...");
      return {
        porta: 3000,
        banco: "localhost"
      };
    }
    
    const config = JSON.parse(dados);
    console.log(`Iniciando na porta ${config.porta}`);
    return config;
  });
}

// Usar:
carregarConfig();
```

### Caso 5: Exportar Relatório em Arquivo
```javascript
const fs = require("fs");
const path = require("path");

function gerarRelatorio(dados) {
  let relatorio = "=== RELATÓRIO ===\n";
  relatorio += `Data: ${new Date().toLocaleString()}\n`;
  relatorio += "==================\n\n";
  
  dados.forEach((item) => {
    relatorio += `ID: ${item.id}\n`;
    relatorio += `Nome: ${item.nome}\n`;
    relatorio += `Valor: R$ ${item.valor}\n`;
    relatorio += "---\n";
  });
  
  fs.writeFile(
    path.join(__dirname, "/relatorios", `relatorio_${Date.now()}.txt`),
    relatorio,
    (erro) => {
      if (erro) {
        console.log("Erro ao gerar relatório: " + erro);
        return;
      }
      console.log("Relatório exportado!");
    }
  );
}

// Usar:
const dados = [
  { id: 1, nome: "Produto A", valor: 100 },
  { id: 2, nome: "Produto B", valor: 200 }
];
gerarRelatorio(dados);
```

---

## ⚠️ Pontos Importantes para Lembrar

✅ **Sempre verificar erros primeiro**
```javascript
if (erro) {
  console.log("Erro: " + erro);
  return;
}
```

✅ **Use "utf-8" para textos**
```javascript
fs.readFile(caminho, "utf-8", callback);
```

✅ **Use `path.join()` para caminhos**
```javascript
fs.writeFile(path.join(__dirname, "/arquivo.txt"), conteudo, callback);
```

❌ **Não concatene caminhos manualmente**
```javascript
// ❌ ERRADO
fs.writeFile(__dirname + "/arquivo.txt", conteudo, callback);

// ✅ CORRETO
fs.writeFile(path.join(__dirname, "/arquivo.txt"), conteudo, callback);
```

❌ **Não esqueça de tratar erros**
```javascript
// ❌ ERRADO
fs.readFile(caminho, (dados) => {
  console.log(dados);
});

// ✅ CORRETO
fs.readFile(caminho, (erro, dados) => {
  if (erro) {
    console.log("Erro: " + erro);
    return;
  }
  console.log(dados);
});
```

---

## 📚 Outras Funções Úteis do FS

Existem muitas outras, aqui algumas destacadas:

### `fs.unlink()` - Deletar arquivo
```javascript
fs.unlink(path.join(__dirname, "/arquivo.txt"), (erro) => {
  if (erro) console.log("Erro: " + erro);
  else console.log("Arquivo deletado!");
});
```

### `fs.rmdir()` - Deletar pasta (vazia)
```javascript
fs.rmdir(path.join(__dirname, "/minhaSlpasta"), (erro) => {
  if (erro) console.log("Erro: " + erro);
  else console.log("Pasta deletada!");
});
```

### `fs.rename()` - Renomear arquivo
```javascript
fs.rename(
  path.join(__dirname, "/antigo.txt"),
  path.join(__dirname, "/novo.txt"),
  (erro) => {
    if (erro) console.log("Erro: " + erro);
    else console.log("Arquivo renomeado!");
  }
);
```

### `fs.stat()` - Obter informações do arquivo
```javascript
fs.stat(path.join(__dirname, "/arquivo.txt"), (erro, stats) => {
  if (erro) console.log("Erro: " + erro);
  else {
    console.log("Tamanho: " + stats.size + " bytes");
    console.log("Criado em: " + stats.birthtime);
    console.log("Modificado em: " + stats.mtime);
  }
});
```

---

## 🚀 Resumo Rápido

```javascript
const fs = require("fs");
const path = require("path");

// Criar pasta
fs.mkdir(path.join(__dirname, "/minhaSlpasta"), callback);

// Criar/Escrever arquivo
fs.writeFile(path.join(__dirname, "/arquivo.txt"), "conteúdo", callback);

// Adicionar ao arquivo
fs.appendFile(path.join(__dirname, "/arquivo.txt"), "\nmais conteúdo", callback);

// Ler arquivo
fs.readFile(path.join(__dirname, "/arquivo.txt"), "utf-8", callback);

// Deletar arquivo
fs.unlink(path.join(__dirname, "/arquivo.txt"), callback);

// Renomear
fs.rename(caminho1, caminho2, callback);

// Informações do arquivo
fs.stat(path.join(__dirname, "/arquivo.txt"), callback);
```

---

**Criado para: Aprendizado e Documentação**
**Data de Criação:** Fevereiro 2026
