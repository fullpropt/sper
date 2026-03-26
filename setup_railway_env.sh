#!/bin/bash
# Script para configurar variáveis de ambiente no Railway
# COLE SEU TOKEN ABAIXO ANTES DE EXECUTAR

RAILWAY_TOKEN="COLE_SEU_TOKEN_AQUI"
PROJECT_ID="0751a11e-2edd-45b3-8be8-2d4e42c30a47"
ENVIRONMENT="production"

echo "=== CONFIGURANDO VARIÁVEIS DE AMBIENTE NO RAILWAY ==="
echo "Project ID: $PROJECT_ID"
echo ""

if [ "$RAILWAY_TOKEN" = "COLE_SEU_TOKEN_AQUI" ]; then
    echo "❌ ERRO: Você precisa editar este arquivo e colocar seu token!"
    echo ""
    echo "Para obter seu token:"
    echo "1. Acesse: https://railway.com/project/$PROJECT_ID/settings/tokens"
    echo "2. Clique em 'New Token'"
    echo "3. Copie o token e cole na linha 5 deste arquivo"
    echo "4. Execute novamente"
    exit 1
fi

# Função para criar/atualizar variável
create_env_var() {
    local name=$1
    local value=$2
    
    echo -n "Configurando: $name... "
    
    RESPONSE=$(curl -s -X POST \
        "https://backboard.railway.app/graphql" \
        -H "Authorization: Bearer $RAILWAY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"query\": \"mutation UpsertVariable(\$input: UpsertVariableInput!) { upsertVariable(input: \$input) { id name value } }\",
            \"variables\": {
                \"input\": {
                    \"projectId\": \"$PROJECT_ID\",
                    \"environmentId\": \"$ENVIRONMENT\",
                    \"name\": \"$name\",
                    \"value\": \"$value\"
                }
            }
        }" 2>&1)
    
    if echo "$RESPONSE" | grep -q '"name":"'$name'"'; then
        echo "✓ OK"
        return 0
    else
        echo "✗ Falhou"
        echo "Resposta: $RESPONSE"
        return 1
    fi
}

# Configurar variáveis de ambiente
echo ""
echo "Digite os valores para as variáveis de ambiente:"
echo ""

read -p "Usuário admin [admin]: " ADMIN_USER
ADMIN_USER=${ADMIN_USER:-admin}

read -sp "Senha admin: " ADMIN_PASS
echo ""

read -p "API Key (deixe em branco para pular): " API_KEY

echo ""
echo "Configurando..."

# Cria as variáveis
create_env_var "ADMIN_USER" "$ADMIN_USER"
create_env_var "ADMIN_PASS" "$ADMIN_PASS"

if [ -n "$API_KEY" ]; then
    create_env_var "API_KEY" "$API_KEY"
fi

echo ""
echo "=== CONFIGURAÇÃO CONCLUÍDA ==="
echo ""
echo "Para verificar as variáveis:"
echo "https://railway.com/project/$PROJECT_ID/settings/variables"
echo ""
echo "Ou use o Railway CLI:"
echo "  railway login"
echo "  railway variables"
