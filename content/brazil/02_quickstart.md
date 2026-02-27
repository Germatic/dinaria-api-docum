# Quickstart: your first PIX payment

This quickstart creates a payment, redirects the customer to complete it, and validates the final status.

## 1) Create a payment

```bash
curl -X POST "https://br.dinaria.com/v1/payments" \
  -H "Authorization: Bearer di_live_xxx" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{
    "externalId": "ORD-1001",
    "amount": "100.50",
    "currency": "BRL",
    "paymentMethods": ["pm_pix"],
    "successUrl": "https://merchant.example/success",
    "cancelUrl": "https://merchant.example/cancel",
    "metadata": {"orderId": "ORD-1001"},
    "customer": {
      "firstName": "João",
      "lastName": "Silva",
      "email": "joao@example.com",
      "documentNumber": "12345678901",
      "country": "BR"
    }
  }'
```

**Response**

- Store `transactionId`
- Redirect the customer to `actionUrl`

```json
{
  "transactionId": "trx_abc123",
  "externalId": "ORD-1001",
  "status": "started",
  "amount": "100.50",
  "currency": "BRL",
  "actionUrl": "https://pay.dinaria.com/checkout/trx_abc123"
}
```

## 2) Redirect the customer

Redirect the customer to `actionUrl`. They will see the PIX QR code or copy-paste instructions.

## 3) Receive webhook

When the customer pays, you receive a webhook with `status: "confirmed"`. Use this as the source of truth.

## 4) Retrieve payment (optional)

```bash
curl -X GET "https://br.dinaria.com/v1/payments/trx_abc123" \
  -H "Authorization: Bearer di_live_xxx"
```
