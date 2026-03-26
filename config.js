// Config Loader - Carrega variáveis de ambiente do Railway
// Este arquivo deve ser incluído em todas as páginas

(function() {
    'use strict';
    
    // Configurações padrão (fallback)
    const DEFAULT_CONFIG = {
        API_BASE_URL: '/api',
        SITE_NAME: 'SPER Framework',
        SITE_URL: window.location.origin,
        DEBUG: false
    };
    
    // Tenta carregar configurações do Railway (injetadas via variáveis de ambiente)
    window.APP_CONFIG = Object.assign({}, DEFAULT_CONFIG, window.RAILWAY_ENV || {});
    
    // Helper para acessar configurações
    window.getConfig = function(key, defaultValue) {
        return window.APP_CONFIG[key] || defaultValue;
    };
    
    // Logging seguro (não expõe dados sensíveis)
    window.logConfig = function() {
        if (window.APP_CONFIG.DEBUG) {
            console.log('[Config] Modo debug ativado');
            console.log('[Config] Site:', window.APP_CONFIG.SITE_NAME);
        }
    };
    
    // Inicialização
    window.logConfig();
})();
