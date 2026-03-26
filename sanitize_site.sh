#!/bin/bash
# Remove todas as conexões externas para evitar logs no site original

echo "=== SANITIZANDO SITE ==="
echo "Removendo trackers e dependências externas..."

# Cria diretório para assets locais
mkdir -p assets/css assets/js assets/img

# Remove Google Tag Manager
find . -name "*.html" -exec sed -i 's/<script>(function(w,d,s,l,i){w\[l\]=w\[l\]||\[\];w\[l\].push.*GTM-5KMW7F69.*<\/script>//g' {} \;
find . -name "*.html" -exec sed -i 's/<noscript><iframe src="https:\/\/www.googletagmanager.com\/ns.html?id=GTM-5KMW7F69".*<\/noscript>//g' {} \;

# Remove GetSiteControl
find . -name "*.html" -exec sed -i 's/<script>setTimeout.*getsitecontrol.com.*<\/script>//g' {} \;

# Remove Google Sign-in
find . -name "*.html" -exec sed -i 's/<link href="https:\/\/accounts.google.com\/gsi\/client".*>//g' {} \;
find . -name "*.html" -exec sed -i 's/<script src="https:\/\/accounts.google.com\/gsi\/client".*><\/script>//g' {} \;

# Remove Meta Pixel
find . -name "*.html" -exec sed -i 's/!function(f,b,e,v,n,t,s).*fbq.*//g' {} \;
find . -name "*.html" -exec sed -i 's/fbq.*//g' {} \;

# Substitui canonical URL
find . -name "*.html" -exec sed -i 's/superseguidores.net/sper-production.up.railway.app/g' {} \;

# Remove referências ao WhatsApp específico (para não vazar número)
find . -name "*.html" -exec sed -i 's/5511981408960/SEU_NUMERO/g' {} \;

echo "✅ Site sanitizado!"
echo ""
echo "⚠️  AVISO: Imagens e CSS ainda carregam de storage.perfectcdn.com"
echo "Para total independência, baixe os assets:"
echo "  wget -P assets/img https://storage.perfectcdn.com/dulhwt/jofytdygljq57buk.png"
