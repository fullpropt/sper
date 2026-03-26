// Admin Login Bypass - Autenticação simulada para painel administrativo
(function() {
    'use strict';
    
    // Dados de admin padrão (simulados)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };
    
    // Token de sessão simulado
    const SESSION_TOKEN = 'admin_session_' + Date.now();
    
    // Verifica se está na página de login
    const isLoginPage = document.querySelector('form[action*="login"]') || 
                        document.querySelector('input[name="username"]') ||
                        document.title.toLowerCase().includes('login');
    
    if (isLoginPage) {
        console.log('[Admin Bypass] Página de login detectada');
        
        // Auto-preenche credenciais (para facilitar)
        const usernameField = document.querySelector('input[name="username"], input[name="email"], input[type="text"]');
        const passwordField = document.querySelector('input[name="password"], input[type="password"]');
        
        if (usernameField && passwordField) {
            // Preenche campos
            usernameField.value = ADMIN_CREDENTIALS.username;
            passwordField.value = ADMIN_CREDENTIALS.password;
            
            // Adiciona botão de bypass
            const form = usernameField.closest('form');
            if (form) {
                const bypassBtn = document.createElement('button');
                bypassBtn.type = 'button';
                bypassBtn.style.cssText = 'margin-top:10px;padding:10px;background:#28a745;color:white;border:none;width:100%;cursor:pointer;';
                bypassBtn.textContent = '🔓 Acessar como Admin';
                bypassBtn.onclick = function() {
                    // Salva sessão
                    localStorage.setItem('admin_session', SESSION_TOKEN);
                    localStorage.setItem('admin_user', ADMIN_CREDENTIALS.username);
                    
                    // Redireciona para painel
                    window.location.href = 'admin/index.html';
                };
                
                form.appendChild(bypassBtn);
                console.log('[Admin Bypass] Botão de bypass adicionado');
            }
        }
        
        // Intercepta submit do formulário
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Qualquer login aceito como admin
                localStorage.setItem('admin_session', SESSION_TOKEN);
                localStorage.setItem('admin_user', 'admin');
                
                alert('✅ Login realizado com sucesso!');
                window.location.href = 'admin/editor/index.html';
                return false;
            });
        });
    }
    
    // Verifica se está no painel admin
    const isAdminPanel = window.location.pathname.includes('/admin/') || 
                         window.location.pathname.includes('/panel/') ||
                         window.location.pathname.includes('/dashboard/');
    
    if (isAdminPanel) {
        // Verifica sessão
        const session = localStorage.getItem('admin_session');
        
        if (!session) {
            console.log('[Admin Bypass] Sem sessão, redirecionando para login...');
            // Redireciona para login se não estiver autenticado
            if (!window.location.pathname.includes('login')) {
                window.location.href = '/index.html';
            }
        } else {
            console.log('[Admin Bypass] Sessão ativa:', session);
            
            // Adiciona header de admin
            const header = document.createElement('div');
            header.style.cssText = 'background:#28a745;color:white;padding:10px;text-align:center;position:fixed;top:0;left:0;right:0;z-index:9999;';
            header.innerHTML = `
                <strong>🔐 MODO ADMIN</strong> | 
                Usuário: ${localStorage.getItem('admin_user') || 'admin'} | 
                <a href="#" onclick="localStorage.clear();window.location.href='/index.html';return false;" style="color:white;">Sair</a>
            `;
            document.body.insertBefore(header, document.body.firstChild);
            document.body.style.marginTop = '40px';
        }
    }
    
    console.log('[Admin Bypass] Script carregado com sucesso');
})();
