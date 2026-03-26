// API Mock - Super Seguidores SEM pagamento
// Todas as requisições retornam sucesso automaticamente

const API_BASE = '/api/v1';

// Mock de respostas da API
const mockResponses = {
    '/order/create': {
        success: true,
        order_id: Math.floor(Math.random() * 1000000),
        status: 'processing',
        message: 'Pedido criado com sucesso! Entrega em até 24h.',
        estimated_delivery: '24 horas'
    },
    '/order/status': {
        success: true,
        status: 'completed',
        progress: 100,
        remaining: 0
    },
    '/balance': {
        success: true,
        balance: 999999.99,
        currency: 'BRL'
    },
    '/services': {
        success: true,
        services: [] // Populado dinamicamente
    }
};

// Intercepta todas as requisições fetch
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    // Simula delay realista
    return new Promise((resolve) => {
        setTimeout(() => {
            // Verifica se é uma API call
            if (url.includes('/api/') || url.includes('/order')) {
                const endpoint = Object.keys(mockResponses).find(key => url.includes(key)) || '/order/create';
                const response = mockResponses[endpoint] || mockResponses['/order/create'];
                
                // Se for criação de pedido, gera dados aleatórios
                if (url.includes('create') || url.includes('order')) {
                    response.order_id = Math.floor(Math.random() * 1000000);
                    response.timestamp = new Date().toISOString();
                }
                
                resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve(response),
                    text: () => Promise.resolve(JSON.stringify(response))
                });
            } else {
                // Fallback para requisições normais
                resolve(originalFetch(url, options));
            }
        }, Math.random() * 1000 + 500); // Delay 500-1500ms
    });
};

console.log('[SuperSeguidores API] Modo SEM PAGAMENTO ativado');
console.log('[SuperSeguidores API] Todos os pedidos são processados automaticamente');
