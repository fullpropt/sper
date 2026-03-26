# 🔐 Configuração Segura no Railway

## ⚠️ IMPORTANTE: Proteja seus dados!

Nunca commite tokens, senhas ou chaves de API no GitHub!

## 📋 Passo a passo para configurar variáveis no Railway:

### 1. Acesse o painel do Railway
https://railway.com/project/0751a11e-2edd-45b3-8be8-2d4e42c30a47/settings/variables

### 2. Clique em "New Variable" e adicione estas:

```
ADMIN_USER=admin
ADMIN_PASS=sua_senha_segura_aqui
API_KEY=seu_api_key_aqui
DEBUG=false
```

### 3. Para variáveis sensíveis (serão ocultadas):
- Marque a opção "Encrypt" ao adicionar

### 4. Usando Railway CLI (alternativa):

```bash
# Instale o CLI
npm install -g @railway/cli

# Login
railway login

# Link ao projeto
railway link

# Configure variáveis
railway variables set ADMIN_USER=admin
railway variables set ADMIN_PASS=sua_senha
railway variables set API_KEY=sua_chave

# Verifique
railway variables
```

## 🛡️ O que foi protegido no repositório:

✅ .gitignore atualizado para ignorar:
   - Arquivos .env
   - Scripts sensíveis
   - Tokens e credenciais

✅ Scripts de setup removidos do tracking:
   - setup_railway_env.sh
   - sanitize_site.sh
   - remove_payment.sh

✅ Configuração externalizada:
   - config.js carrega variáveis dinamicamente
   - railway.yaml documenta as variáveis necessárias

## 🔍 Verificação de segurança:

Antes de cada commit, execute:
```bash
git status              # Veja o que será commitado
git diff --cached       # Verifique as alterações
grep -r "ghp_" .        # Busca tokens acidentais
grep -r "key_" .        # Busca API keys
```

## 🚨 Se expôs algo acidentalmente:

1. **Revogue o token imediatamente**:
   - GitHub: Settings > Developer settings > Personal access tokens
   - Railway: Project Settings > Tokens > Delete

2. **Limpe o histórico**:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch arquivo_sensivel' \
   HEAD
   ```

3. **Force push** (cuidado!):
   ```bash
   git push origin main --force
   ```

## 📞 Suporte

Project ID: `0751a11e-2edd-45b3-8be8-2d4e42c30a47`
Railway URL: https://railway.com/project/0751a11e-2edd-45b3-8be8-2d4e42c30a47
