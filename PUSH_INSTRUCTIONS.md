# Instruções para Push no GitHub

## Método 1: HTTPS com Token (Recomendado)

```bash
# Configure o token (substitua SEU_TOKEN pelo seu Personal Access Token)
git remote add origin https://brs132:SEU_TOKEN@github.com/brs132/sper.git
git branch -M main
git push -u origin main --force
```

## Método 2: SSH

```bash
# Configure a chave SSH primeiro, depois:
git remote add origin git@github.com:brs132/sper.git
git branch -M main
git push -u origin main --force
```

## Método 3: GitHub CLI

```bash
# Instale o gh: https://cli.github.com/
gh auth login
gh repo clone brs132/sper
cd sper
# Copie os arquivos deste diretório para lá
git add .
git commit -m "Clone Super Seguidores sem pagamento"
git push
```

## Estrutura do Repositório

```
sper/
├── index.html                 # Página principal
├── services.html             # Catálogo de serviços
├── cadastro.html             # Cadastro
├── api_mock.js               # API mock (bypass pagamento)
├── README.md                 # Documentação
├── admin/                    # Painel admin
├── blog/                     # Artigos do blog
├── react_apps/               # Aplicações React
└── ...                       # Demais páginas
```

## Funcionalidades da API Mock

- ✅ Bypass completo de pagamento Pix
- ✅ Pedidos processados automaticamente
- ✅ Simulação de entrega em 24h
- ✅ Respostas realistas com delays

## Notas

- Total de arquivos: 296
- Tamanho: ~30MB
- Todas as referências a Pix foram removidas
