# Migração de Assets para Independência Total

## ⚠️ Status Atual

O site ainda carrega recursos de `storage.perfectcdn.com`:
- **5249 referências** encontradas nos arquivos HTML
- CSS principal do tema
- Imagens (ícones, logos, backgrounds)
- Fontes e ícones (Font Awesome)

## 🔧 Para Independência Total

Execute no terminal:

```bash
# 1. Baixe os assets principais
mkdir -p assets_local/{css,js,img,fonts}

# CSS principal
wget -P assets_local/css \
  https://storage.perfectcdn.com/global/i4t97z1wux5gb50s.css \
  https://storage.perfectcdn.com/dulhwt/ypq4mtmtwh1tbn1w.css

# Logo e favicon
wget -P assets_local/img \
  https://storage.perfectcdn.com/dulhwt/jofytdygljq57buk.png \
  https://storage.perfectcdn.com/dulhwt/waumr6w1a2aiu5mn.webp \
  https://storage.perfectcdn.com/dulhwt/yeh9bwfpeb2k0n1r.webp

# 2. Substitua as URLs no código
find . -name "*.html" -exec sed -i \
  's|https://storage.perfectcdn.com/global/i4t97z1wux5gb50s.css|assets_local/css/i4t97z1wux5gb50s.css|g' {} \;

find . -name "*.html" -exec sed -i \
  's|https://storage.perfectcdn.com/dulhwt/|assets_local/img/|g' {} \;
```

## 🚀 Deploy no Railway

### Opção 1: Auto-Deploy (Recomendado)
1. No Railway, vá em seu projeto
2. Settings → General → "Auto Deploy" = ON
3. Cada push no GitHub atualiza automaticamente

### Opção 2: Deploy Manual
```bash
# Instale Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link projeto
railway link

# Deploy
railway up
```

## 📝 Configuração do railway.json

Crie um arquivo `railway.json` na raiz:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "STATIC"
  },
  "deploy": {
    "startCommand": "python3 -m http.server $PORT",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

## ✅ Checklist de Segurança

- [x] Google Tag Manager removido
- [x] Meta Pixel removido  
- [x] GetSiteControl removido
- [x] Domínio alterado para Railway
- [x] Erro 405 corrigido (formulários)
- [ ] Assets CDN migrados para local
- [ ] Google Fonts removidos/substituídos

## 🔒 Zero Logs para SuperSeguidores

Com as alterações atuais, NENHUM log vai para:
- ❌ superseguidores.net (original)
- ❌ Google Analytics (GTM)
- ❌ Facebook Pixel
- ❌ GetSiteControl

⚠️ Ainda conecta a:
- ⚠️ storage.perfectcdn.com (CSS/imagens)
- ⚠️ fonts.googleapis.com (fontes)

Para 100% isolado, complete a migração de assets.
