---
title: Quickstart
nav_order: 40
---

# Quickstart

This guide shows the fastest way to start using the Dinaria API.

Dinaria supports two independent capabilities:

- **Payments (Pay-in)** — receive funds from customers
- **Payouts (Money-out)** — send funds to recipients

These flows can be integrated independently.

Typical money movement looks like this:

Pay-in → Balance → Payout
        ↑
     Prefunding

---

# 1. Authentication

All API requests must include your API key.

Example request:

POST /payments
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

---

# 2. Create your first payment (Pay-in)

POST /payments

```json
{
  "amount": "100.00",
  "currency": "BRL",
  "externalId": "ORD-1001",
  "customer": {
    "name": "João Silva",
    "documentNumber": "12345678901"
  }
}
```

Example response:

```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "status": "started",
  "amount": "100.00",
  "currency": "BRL",
  "actionUrl": "https://pay.dinaria.com/checkout/f90c7c31-7a38-46dc-99ba-188a4c99da29"
}
```

---

# 3. Complete the payment

Hosted mode:

Redirect the payer to:

actionUrl

Advanced mode:

Use nextAction to render your own UI.

Supported types:

- redirect_to_url
- display_qr
- display_instructions
- display_voucher
- display_reference
- collect_customer_data
- none

---

# 4. Receive payment confirmation

Webhook event:

payment.succeeded

---

# 5. Send your first payout

## Create beneficiary

POST /beneficiaries

```json
{
  "firstName": "Maria",
  "lastName": "Silva"
}
```

## Add destination

POST /beneficiaries/{beneficiaryId}/proxy-keys

```json
{
  "scheme": "PIX",
  "keyType": "EMAIL",
  "key": "maria@email.com"
}
```

## Create payout

POST /payouts

```json
{
  "amount": "100.00",
  "currency": "BRL",
  "beneficiaryId": "ben_123"
}
```

---

# 6. Receive payout confirmation

Webhook event:

payout.completed
