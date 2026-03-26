#!/bin/bash
# Remove integrações de pagamento Pix e similares

for file in $(grep -r -l "pix\|PIX\|mercadopago\|Mercado Pago\|pagamento.*pix\|checkout.*pix" --include="*.html" . 2>/dev/null); do
    echo "Processando: $file"
    # Remove botões de pagamento Pix (heurística)
    sed -i 's/<a[^>]*pix[^>]*>[^<]*<\/a>//gi' "$file" 2>/dev/null
    sed -i 's/<button[^>]*pix[^>]*>[^<]*<\/button>//gi' "$file" 2>/dev/null
    # Substitui textos de pagamento
    sed -i 's/Pague com Pix/Pagamento processado automaticamente/gi' "$file" 2>/dev/null
    sed -i 's/QR Code Pix/Pedido confirmado/gi' "$file" 2>/dev/null
    sed -i 's/Chave Pix/ID do pedido/gi' "$file" 2>/dev/null
done

echo "Pagamento Pix removido!"
