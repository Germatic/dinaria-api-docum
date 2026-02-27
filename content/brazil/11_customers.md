# Customers

A **Customer** is a saved payout recipient. Instead of providing a destination PIX key on every payout, you create a Customer once — with their personal data and one or more PIX-linked bank accounts — and reference them by ID.

This is recommended for:
- Platforms that pay the same sellers, drivers, or contractors repeatedly
- Merchants that need to maintain a verified record of payout recipients
- Compliance and audit workflows requiring CPF/CNPJ validation

---

## Create a customer

`POST /customers`

```http
POST /customers
Authorization: Bearer sk_live_<your-merchant-key>
Content-Type: application/json
```

```json
{
  "type": "individual",
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "country": "BR",
  "metadata": {
    "cpf": "12345678901",
    "internalUserId": "USR-7890"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | `individual` or `business` |
| `name` | string | ✅ | Full name or business name |
| `country` | string | ✅ | `BR` for Brazil |
| `email` | string | — | Contact email |
| `metadata` | object | — | Free-form key-value pairs. Good place to store CPF/CNPJ. |

### Response

```json
{
  "customerId": "cust_br_12345",
  "type": "individual",
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "country": "BR",
  "defaultBankAccountId": null,
  "metadata": {
    "cpf": "12345678901",
    "internalUserId": "USR-7890"
  },
  "createdAt": "2026-02-25T12:00:00Z"
}
```

---

## Add a PIX bank account

`POST /customers/{customerId}/bank-accounts`

Register the customer's PIX key as a bank account so it can be used in payouts.

```json
{
  "country": "BR",
  "currency": "BRL",
  "rail": "PIX",
  "accountType": "other",
  "holderName": "João Silva",
  "accountNumber": "joao.silva@example.com"
}
```

The `accountNumber` field holds the PIX key. Supported PIX key types:

| Type | Value in `accountNumber` |
|------|--------------------------|
| CPF | `12345678901` |
| CNPJ | `12345678000195` |
| Phone | `+5511987654321` |
| Email | `joao@example.com` |
| Random key | `123e4567-e89b-12d3-a456-426614174000` |

### Response

```json
{
  "bankAccountId": "ba_pix_99887",
  "customerId": "cust_br_12345",
  "country": "BR",
  "currency": "BRL",
  "rail": "PIX",
  "accountNumberLast4": null,
  "accountType": "other",
  "holderName": "João Silva",
  "createdAt": "2026-02-25T12:00:00Z"
}
```

---

## Use in a payout

```json
{
  "amount": "1200.00",
  "currency": "BRL",
  "rail": "PIX",
  "customerId": "cust_br_12345",
  "bankAccountId": "ba_pix_99887"
}
```

---

## Retrieve a customer

`GET /customers/{customerId}`

```http
GET /customers/cust_br_12345
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## List customers

`GET /customers`

```http
GET /customers?limit=50
Authorization: Bearer sk_live_<your-merchant-key>
```

| Parameter | Description |
|-----------|-------------|
| `limit` | Max results (1–200, default 50) |
| `startingAfter` | Cursor-based pagination (customer ID) |

---

## List bank accounts

`GET /customers/{customerId}/bank-accounts`

Returns all PIX keys (bank accounts) registered for a customer.
