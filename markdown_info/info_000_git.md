# 🔀 Guia Completo: Git e Controle de Versão

## O que é Git?

Git é um **sistema de controle de versão** que permite:
- 📝 Rastrear alterações no código
- 🔄 Voltar a versões anteriores
- 👥 Colaborar com outras pessoas
- 📊 Manter um histórico completo do projeto
- 🌿 Criar ramificações (branches) para desenvolvimentos paralelos

```bash
git --version  # Verificar se Git está instalado
```

---

## 🎯 Conceitos Fundamentais

### Repository (Repositório)
Pasta do seu projeto que Git controla. Contém todo o histórico de alterações.

### Commit
Um "ponto de salvamento" com descrição do que foi mudado.

### Branch (Ramo)
Uma linha de desenvolvimento independente. O padrão é `main` ou `master`.

### Remote
Servidor remoto onde o código é armazenado (ex: GitHub).

### Staging Area
Área onde você prepara as mudanças antes de fazer commit.

---

## 🚀 Começando um Projeto do Zero

### Passo 1: Inicializar Repositório
```bash
mkdir meu-projeto
cd meu-projeto
git init
```

**O que acontece:**
- Cria pasta `.git` (não mexer nela!)
- Inicia o rastreamento de versão

### Passo 2: Criar Arquivo .gitignore
Antes de qualquer coisa, crie `.gitignore`:

```bash
touch .gitignore
```

**Conteúdo típico de .gitignore:**
```
node_modules/
.env
.DS_Store
*.log
dist/
build/
.vscode/
```

### Passo 3: Fazer o Primeiro Commit
```bash
git add .
git commit -m "Initial commit: projeto inicial"
```

---

## 📝 Padrões de Commit Profissionais

### Formato Recomendado

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adicionar login com Google` |
| `fix` | Correção de bug | `fix(button): corrigir clique duplo` |
| `docs` | Documentação | `docs(readme): atualizar instruções` |
| `style` | Formatação (sem lógica) | `style(code): remover espaços em branco` |
| `refactor` | Reorganizar código | `refactor(utils): simplificar função` |
| `perf` | Melhorar performance | `perf(api): cachear requisições` |
| `test` | Testes | `test(auth): adicionar testes de login` |
| `chore` | Manutenção | `chore(deps): atualizar dependências` |

### ✅ Exemplos Bons de Commits

```bash
# Simples e claro
git commit -m "feat(usuario): criar sistema de cadastro"

# Com descrição detalhada
git commit -m "fix(email): corrigir validação de email

- Remover caracteres especiais inválidos
- Adicionar teste unitário
- Atualizar documentação

Fixes #123"

# Refatoração
git commit -m "refactor(database): reorganizar queries"

# Correção rápida
git commit -m "style(formatting): ajustar indentação"
```

### ❌ Exemplos Ruins de Commits

```bash
# Vago demais
git commit -m "alterações"

# Sem contexto
git commit -m "arrumado"

# Muito genérico
git commit -m "update"

# Sem padronização
git commit -m "Add novo feature user system login"
```

---

## 🔄 Fluxo Básico: Adicionar e Enviar

### Passo 1: Verificar Status
```bash
git status
```

**Resultado possível:**
```
On branch main
Changes not staged for commit:
  modified:   index.js
  modified:   package.json

Untracked files:
  new_file.txt
```

### Passo 2: Adicionar Alterações (Staging)

**Adicionar arquivo específico:**
```bash
git add index.js
```

**Adicionar todos os arquivos:**
```bash
git add .
```

**Adicionar com padrão:**
```bash
git add *.js       # Todos os .js
git add src/       # Toda a pasta src
```

**Remover do staging (antes de fazer commit):**
```bash
git reset index.js
git reset .        # Remover tudo
```

### Passo 3: Ver o que vai ser Commitado
```bash
git diff --staged
```

### Passo 4: Fazer Commit

**Commit simples:**
```bash
git commit -m "feat(database): conectar ao MongoDB"
```

**Commit com editor (para descrições longas):**
```bash
git commit
# Abre editor de texto para escrever mensagem detalhada
```

**Adicionar e commitar de uma vez (só arquivos já rastreados):**
```bash
git commit -am "fix(button): corrigir hover"
```

---

## 📤 Enviando para o Servidor Remoto (GitHub)

### Passo 1: Conectar ao Repositório Remoto

**Adicionar remote:**
```bash
git remote add origin https://github.com/usuario/meu-repo.git
```

**Ver remotes cadastrados:**
```bash
git remote -v
```

**Resultado:**
```
origin  https://github.com/usuario/meu-repo.git (fetch)
origin  https://github.com/usuario/meu-repo.git (push)
```

### Passo 2: Fazer Push (Enviar para servidor)

**Enviar para main:**
```bash
git push origin main
```

**Enviar e definir como padrão:**
```bash
git push -u origin main
# Próximas vezes pode ser só: git push
```

**Enviar uma branch específica:**
```bash
git push origin minha-branch
```

### Passo 3: Fazer Pull (Baixar Mudanças)

**Atualizar seu código com arquivo remoto:**
```bash
git pull origin main
```

**Equivalente a:**
```bash
git fetch origin     # Baixa mudanças
git merge origin/main  # Mescla com seu código local
```

---

## 🙈 Arquivo .gitignore - Rastrear Pastas Importantes

### O que é .gitignore?

Arquivo que diz ao Git **quais arquivos/pastas NÃO enviar** para o servidor.

### Criando .gitignore

**Criar o arquivo:**
```bash
touch .gitignore
```

### Padrões Comuns

```
# Node.js
node_modules/
npm-debug.log
package-lock.json

# Python
__pycache__/
*.pyc
venv/

# Variáveis de ambiente
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp

# Sistema Operacional
.DS_Store
Thumbs.db

# Arquivos compilados
dist/
build/
*.o

# Diretórios temporários
tmp/
temp/
log/

# Especific do projeto
uploads/
cache/
.cache
```

### Exemplo Completo para Node.js

```
# Dependências
node_modules/
package-lock.json
yarn.lock

# Ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Sistema
.DS_Store
Thumbs.db

# Build
dist/
build/
out/

# Dados sensíveis
uploads/
database.sqlite
```

### Verificar o que será Ignorado

```bash
# Ver arquivos que serão ignorados
git status --ignored

# Ver padrões de .gitignore
git check-ignore -v <arquivo>
```

---

## 🔧 Adicionando .gitignore Depois (Já Enviou node_modules)

### Problema
Você já enviou `node_modules/` para o repositório e quer remover agora.

### Solução

**Passo 1: Criar/Atualizar .gitignore**
```
node_modules/
```

**Passo 2: Remover do rastreamento (sem deletar localmente)**
```bash
git rm -r --cached node_modules/
```

**Passo 3: Fazer commit**
```bash
git commit -m "chore: remover node_modules do rastreamento"
```

**Passo 4: Enviar**
```bash
git push origin main
```

**Passo 5: Outros devs atualizam**
```bash
git pull  # Baixa mudanças
npm install # Reinstala localmente
```

### Comando Rápido (Tudo de uma vez)

```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "chore: remover node_modules do rastreamento"
git push
```

---

## ⏮️ Viajando no Tempo (Desfazer Coisas)

### Ver Histórico

**Ver commits recentes:**
```bash
git log
```

**Ver resumido:**
```bash
git log --oneline
```

**Resultado:**
```
a1b2c3d (HEAD -> main) feat: novo sistema de autenticação
f4e5d6c fix: corrigir validação de senha
g7h8i9j docs: atualizar README
k0l1m2n Initial commit
```

**Ver commits de um arquivo:**
```bash
git log -- arquivo.js
```

### Voltar a um Commit Anterior

#### Opção 1: Revert (Seguro - cria novo commit)

```bash
git revert a1b2c3d
# Cria novo commit que desfaz as mudanças
```

**Quando usar:** Em repositórios públicos/compartilhados

#### Opção 2: Reset (Radical - apaga histórico)

```bash
# Voltar um commit mantendo arquivos
git reset --soft HEAD~1

# Voltar um commit removendo mudanças
git reset --hard HEAD~1

# Voltar para um commit específico
git reset --hard a1b2c3d
```

**Quando usar:** Apenas em repositórios locais ou privados

#### Opção 3: Checkout (Ver arquivo antigo sem mudar histórico)

```bash
git checkout a1b2c3d -- arquivo.js
# Volta o arquivo para aquela versão
```

### Diferenças Entre Revert e Reset

| Operação | Histórico | Seguro | Quando Usar |
|----------|-----------|--------|------------|
| `revert` | Mantém | ✅ Sim | Repositório compartilhado |
| `reset` | Apaga | ❌ Não | Apenas localmente |
| `checkout` | Mantém | ✅ Sim | Ver versão anterior |

### Exemplo Prático: Desfazer Último Commit

**Mantendo as mudanças:**
```bash
git reset --soft HEAD~1
# Arquivos voltam ao staging
git status  # Verá os arquivos prontos para commitar
```

**Perdendo as mudanças:**
```bash
git reset --hard HEAD~1
# Arquivo volta ao estado anterior
```

---

## 🌿 Branches - Desenvolver em Paralelo

### Por que usar Branches?

```
main (versão estável)
├── feature/login (trabalhando em login)
├── feature/pagamento (trabalhando em pagamento)
└── fix/bug-usuarios (corrigindo bug)
```

### Criar Branch

**Criar nova branch:**
```bash
git branch minha-feature
```

**Criar e trocar para ela:**
```bash
git checkout -b minha-feature
# Ou (versão mais nova):
git switch -c minha-feature
```

**Ver branches:**
```bash
git branch
```

**Resultado:**
```
  feature/login
  feature/pagamento
* main
```

(O `*` mostra em qual você está)

### Trocar de Branch

**Mudar para outra branch:**
```bash
git checkout feature/login
# Ou (versão mais nova):
git switch feature/login
```

**Verificar em qual está:**
```bash
git branch -a
```

### Convenção de Nomes para Branches

```
feature/login              # Nova funcionalidade
feature/sistema-pagamento

fix/bug-usuarios           # Correção de bug
fix/validacao-email

docs/readme                # Documentação
docs/api

refactor/simplificar-codigo  # Refatoração
refactor/melhorar-performance

hotfix/erro-critico        # Correção urgente
```

### Trabalhar em uma Branch

```bash
# 1. Criar e trocar para a branch
git checkout -b feature/nova-funcao

# 2. Fazer alterações
# Editar arquivos...

# 3. Adicionar e commitar
git add .
git commit -m "feat(nova-funcao): implementar nova feature"

# 4. Enviar para servidor
git push origin feature/nova-funcao
```

### Mesclar Branches (Merge)

**Voltar para main:**
```bash
git checkout main
```

**Mesclar a feature:**
```bash
git merge feature/nova-funcao
```

**Enviar:**
```bash
git push origin main
```

**Deletar branch após merge:**
```bash
# Localmente
git branch -d feature/nova-funcao

# Remotamente
git push origin --delete feature/nova-funcao
```

---

## 🔗 Fluxo Completo: Do Inicio ao Merge

```bash
# 1. Clonar repositório
git clone https://github.com/usuario/repo.git
cd repo

# 2. Criar branch para nova feature
git checkout -b feature/login

# 3. Fazer alterações
# ... editar arquivos ...

# 4. Verificar status
git status

# 5. Adicionar alterações
git add .

# 6. Fazer commit com mensagem padrão
git commit -m "feat(auth): implementar sistema de login"

# 7. Enviar branch para servidor
git push origin feature/login

# 8. Criar Pull Request no GitHub
# (Ir no GitHub, clicar em Compare & pull request)

# 9. Após aprovação, mesclar no GitHub OU localmente:
git checkout main
git pull origin main
git merge feature/login
git push origin main

# 10. Deletar branch local
git branch -d feature/login

# 11. Deletar branch remota
git push origin --delete feature/login
```

---

## 🔍 Comandos Úteis do Dia-a-Dia

### Ver Mudanças

```bash
# Ver diferenças desde último commit
git diff

# Ver diferenças já adicionadas (staging)
git diff --staged

# Ver mudanças de um arquivo específico
git diff arquivo.js

# Comparar duas branches
git diff main feature/login
```

### Stash (Guardar Mudanças Temporariamente)

```bash
# Guardar mudanças sem commitar
git stash

# Ver lista de stashes
git stash list

# Recuperar stash mais recente
git stash pop

# Recuperar stash específico
git stash pop stash@{0}

# Deletar stash
git stash drop
```

### Renomear Branch

```bash
# Renomear branch atual
git branch -m novo-nome

# Renomear outra branch
git branch -m nome-antigo novo-nome
```

### Atualizar Branch com Main

```bash
git fetch origin
git rebase origin/main
# Ou:
git merge origin/main
```

### Ver Quem Mudou o Que

```bash
# Ver quem mudou cada linha
git blame arquivo.js

# Ver commits que afetaram uma função
git log -p --follow -S "minhafuncao" -- arquivo.js
```

---

## 📊 Fluxo Git Profissional Típico (Git Flow)

```
main (produção - tags: v1.0, v1.1)
  ↑
  │
release/1.0 (preparar release)
  ↑
  │
develop (próxima versão)
  ↑
  ├── feature/login
  ├── feature/pagamento
  ├── feature/perfil
  │
  └── fix/bug-usuarios
```

**Processo:**
1. Criar feature a partir de `develop`
2. Após testes, fazer merge em `develop`
3. Quando pronto para release, criar `release/x.x`
4. Fazer merge de `release/x.x` em `main`
5. Tagear como versão estável

---

## 💾 Salvando Credenciais Git

### Salvar senha (não recomendado)

```bash
git config --global credential.helper store
# Próxima ação que pedir senha, salva automaticamente
```

### Usar SSH (Recomendado)

```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu.email@gmail.com"

# Adicionar chave ao GitHub
# Copiar conteúdo de ~/.ssh/id_ed25519.pub
# Ir em GitHub Settings > SSH Keys > New SSH Key

# Testar conexão
ssh -T git@github.com
```

---

## ⚠️ Erros Comuns e Como Resolver

### Erro: "origin already exists"

```bash
# Remover remote antigo
git remote remove origin

# Adicionar novo
git remote add origin <url-nova>
```

### Erro: "rejeitado push porque o repositório remoto contém trabalho"

```bash
# Você esqueceu de fazer pull antes de push
git pull origin main
git push origin main
```

### Erro: "conflito de merge"

```bash
# 1. Ver arquivos em conflito
git status

# 2. Editar arquivo e resolver conflito manualmente
# Procure por: <<<<<<< HEAD ... ======= ... >>>>>>>

# 3. Depois de resolver, adicionalizar
git add arquivo-resolvido.js

# 4. Completer merge
git commit -m "merge: resolver conflitos"
```

---

## 🎯 Checklist para Trabalhar Profissionalmente

- [ ] Criar `.gitignore` no início do projeto
- [ ] Fazer commits frequentes com mensagens descritivas
- [ ] Usar branches para features/fixes
- [ ] Fazer pull antes de push
- [ ] Revisar código para mesclagens
- [ ] Manter `main` estável (somente código testado)
- [ ] Usar tags para versões (`git tag v1.0`)
- [ ] Deletar branches após merge
- [ ] Documentar fluxo Git no README

---

## 🚀 Resumo Rápido

```bash
# Iniciar projeto
git init
touch .gitignore
git add .
git commit -m "Initial commit"

# Conectar ao GitHub
git remote add origin <url>
git push -u origin main

# Fluxo diário
git status
git add .
git commit -m "feat: descrição da mudança"
git push origin main

# Trabalhar com branches
git checkout -b feature/nova
# ... fazer mudanças ...
git add .
git commit -m "feat: implementar nova"
git push origin feature/nova
# (Merge no GitHub)

# Voltar histórico
git log --oneline
git revert <commit>  # Ou git reset (cuidado!)

# Desfazer coisas
git reset --soft HEAD~1   # Desfazer commit mantendo arquivos
git reset --hard HEAD~1   # Desfazer completamente
git checkout -- arquivo   # Descartar mudanças em arquivo
```

---

**Criado para: Aprendizado e Documentação**  
**Data de Criação:** Fevereiro 2026
