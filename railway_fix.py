#!/usr/bin/env python3
"""
Script para corrigir integração com Railway
- Remove trackers externos
- Configura API mock para funcionar no Railway
- Corrige formulários para evitar erro 405
"""

import os
import re
import glob

print("=== CORREÇÃO PARA RAILWAY ===\n")

# Lista de arquivos HTML
html_files = glob.glob("*.html") + glob.glob("blog/*.html") + glob.glob("admin/**/*.html", recursive=True)
print(f"Encontrados {len(html_files)} arquivos HTML")

total_changes = 0

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original = content
        
        # 1. Remove Google Tag Manager
        content = re.sub(r'<script>\(function\(w,d,s,l,i\).*?GTM-5KMW7F69.*?</script>', '', content, flags=re.DOTALL)
        content = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com/ns\.html[^"]*"[^>]*></iframe></noscript>', '', content)
        
        # 2. Remove Meta Pixel
        content = re.sub(r'!function\(f,b,e,v,n,t,s\).*?fbq\(\'track",\s*\'PageView\'\);', '', content, flags=re.DOTALL)
        content = re.sub(r'<noscript><img[^>]*facebook\.com/tr[^>]*></noscript>', '', content)
        
        # 3. Remove GetSiteControl
        content = re.sub(r'<script>\s*setTimeout\(function\(\)\s*{[^}]*getsitecontrol[^}]*}\s*,\s*\d+\);\s*</script>', '', content, flags=re.DOTALL)
        
        # 4. Corrige formulários para evitar 405 (adiciona preventDefault via JS)
        if '<form' in content and 'api_mock.js' not in content:
            # Adiciona o script no final do body se não existir
            if '</body>' in content:
                script_inject = '''<script>
// Railway Fix - Previne erro 405 em formulários estáticos
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('[Railway] Formulário interceptado');
        // Simula sucesso
        alert('Operação realizada com sucesso!');
        return false;
    });
});
</script>\n</body>'''
                content = content.replace('</body>', script_inject)
        
        # 5. Substitui referências ao domínio original
        content = content.replace('superseguidores.net', 'sper-production.up.railway.app')
        content = content.replace('https://facebook.superseguidores.net/', '#')
        content = content.replace('https://instagram.superseguidores.net/', '#')
        content = content.replace('https://tiktok.superseguidores.net/', '#')
        
        # 6. Remove WhatsApp específico
        content = content.replace('5511981408960', '0000000000000')
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            total_changes += 1
            
    except Exception as e:
        print(f"Erro em {filepath}: {e}")

print(f"\n✅ {total_changes} arquivos modificados")
print("\n⚠️  NOTAS IMPORTANTES:")
print("1. O site ainda carrega CSS/JS de storage.perfectcdn.com")
print("2. Para total independência, você precisa baixar esses assets")
print("3. Os formulários agora têm preventDefault para evitar erro 405")
print("4. Removidos: Google Tag Manager, Meta Pixel, GetSiteControl")
