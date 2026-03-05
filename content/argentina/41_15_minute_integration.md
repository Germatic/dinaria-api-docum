---
title: 15 Minute Integration
nav_order: 41
---

# 15 Minute Integration

This guide walks through a complete Dinaria integration.

Dinaria separates receiving funds from sending funds.

Pay-in → Balance → Payout

Payouts may also be executed from prefunded balances.

---

# Part 1 — Pay-in (Receive money)

## Step 1 — Create payment

POST /payments

```json
{
  "amount": "100.00",
  "currency": "BRL",
  "customer": {
    "firstName": "João",
    "lastName": "Silva"
  }
}
```

Response:

```json
{
  "paymentId": "pay_123",
  "status": "pending",
  "actionUrl": "https://pay.dinaria.com/...",
  "nextAction": {
    "type": "display_qr"
  }
}
```

---

## Step 2 — Handle nextAction

Example QR:

```json
{
  "nextAction": {
    "type": "display_qr",
    "details": {
      "qr": {
        "payload": "000201..."
      }
    }
  }
}
```

Example redirect:

```json
{
  "nextAction": {
    "type": "redirect_to_url",
    "details": {
      "url": "https://bank.example/pay"
    }
  }
}
```

---

## Step 3 — Wait for confirmation

Webhook:

payment.succeeded

---

# Part 2 — Payout (Send money)

## Step 1 — Create beneficiary

POST /beneficiaries

```json
{
  "firstName": "Maria",
  "lastName": "Silva"
}
```

## Step 2 — Add destination

POST /beneficiaries/{beneficiaryId}/proxy-keys

```json
{
  "scheme": "PIX",
  "keyType": "EMAIL",
  "key": "maria@email.com"
}
```

## Step 3 — Send payout

POST /payouts

```json
{
  "amount": "100.00",
  "currency": "BRL",
  "beneficiaryId": "ben_123"
}
```

---

## Step 4 — Monitor events

Webhook:

payout.completed
