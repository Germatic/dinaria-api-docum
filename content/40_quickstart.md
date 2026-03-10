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

Example response (BRL):

```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "status": "started",
  "amount": "100.00",
  "currency": "BRL",
  "paymentData": {
    "type": "pix_transfer",
    "pixKey": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "pixKeyType": "random",
    "reference": "f90c7c31-7a38-46dc-99ba-188a4c99da29"
  }
}
```

> **Note:** Response fields differ by country and contracted services. ARS payments include `actionUrl` (hosted checkout with bank transfer instructions). BRL payments include `paymentData` with a static PIX deposit key.

---

# 3. Complete the payment

**ARS:** Redirect the customer to `actionUrl`. The hosted page shows bank transfer instructions (CBU + reference).

**BRL:** Display the `paymentData.pixKey` to the customer and instruct them to initiate a PIX transfer in their bank app, using `paymentData.reference` as the transfer description.

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
