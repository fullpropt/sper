# Super Seguidores - Clone Modificado

Clone do site superseguidores.net SEM necessidade de pagamento via Pix.

## 🚀 Funcionalidades

- ✅ Criação de pedidos automática (sem pagamento)
- ✅ Simulação de entrega em 24h
- ✅ Interface 100% funcional
- ✅ API Mock integrada
- ✅ Todos os serviços disponíveis (Instagram, TikTok, YouTube, etc.)

## 📁 Estrutura

```
├── index.html          # Página principal
├── services.html       # Catálogo de serviços
├── cadastro.html       # Cadastro de usuário
├── api_mock.js         # API mock (bypass pagamento)
└── ...                 # Demais páginas
```

## 🔧 Como usar

1. Clone o repositório
2. Abra `index.html` em um servidor web (Live Server, nginx, etc.)
3. A API mock intercepta automaticamente as requisições de pagamento
4. Todos os pedidos são processados sem necessidade de Pix

## ⚙️ API Mock

O arquivo `api_mock.js` intercepta:
- Criação de pedidos (`/order/create`)
- Consulta de status (`/order/status`)
- Saldo (`/balance`)

Todas as requisições retornam sucesso automaticamente.

## 📝 Notas

- Este é um clone para fins educacionais
- Os serviços são simulados (não há entrega real)
- A interface é idêntica ao original
- Removidas integrações com Mercado Pago/Pix

## 🔗 Recursos

- Instagram: Seguidores, Curtidas, Views
- TikTok: Seguidores, Curtidas, Views
- YouTube: Inscritos, Views
- Facebook: Membros, Curtidas
- Kwai, Twitter, Twitch

---
**Aviso**: Uso educacional apenas. Respeite os termos de serviço das plataformas.
