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
  "externalId": "ORD-1001",
  "customer": {
    "name": "João Silva",
    "documentNumber": "12345678901"
  }
}
```

Response (BRL):

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

> **Note:** Response fields differ by country and contracted services. ARS payments include `actionUrl` (hosted checkout). BRL payments include `paymentData` with a static PIX deposit key — there is no redirect.

---

## Step 2 — Instruct the customer

**BRL:** Display the `paymentData.pixKey` to the customer. Instruct them to open their bank app, initiate a PIX transfer to that key, and use the `paymentData.reference` (the `transactionId`) as the transfer description. The payment is matched automatically once the transfer is received.

**ARS:** Redirect the customer to `actionUrl`. The hosted page shows the CBU and reference for the bank transfer.

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
