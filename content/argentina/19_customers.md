# Customers

A **Customer** is a saved payout recipient. Instead of providing the destination CBU on every payout, you create a Customer once — with their personal data and one or more bank accounts — and reference them by ID.

This is recommended for:
- Platforms that pay the same sellers, drivers, or contractors repeatedly
- Merchants that need to maintain a clean record of payout recipients
- Compliance and audit workflows that require verified beneficiary data

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
  "name": "Gerardo Ratto",
  "email": "gerardo@example.com",
  "country": "AR",
  "metadata": {
    "internalUserId": "USR-4421"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | `individual` or `business` |
| `name` | string | ✅ | Full name or business name |
| `country` | string | ✅ | ISO 3166-1 alpha-2 (e.g. `AR`) |
| `email` | string | — | Contact email |
| `metadata` | object | — | Free-form key-value pairs for your internal references |

### Response

```json
{
  "customerId": "cust_12345",
  "type": "individual",
  "name": "Gerardo Ratto",
  "email": "gerardo@example.com",
  "country": "AR",
  "defaultBankAccountId": null,
  "metadata": {
    "internalUserId": "USR-4421"
  },
  "createdAt": "2026-02-25T12:00:00Z"
}
```

---

## Add a bank account

`POST /customers/{customerId}/bank-accounts`

Once the customer exists, add their CBU or CVU so it can be used in payouts.

```json
{
  "country": "AR",
  "currency": "ARS",
  "rail": "OTHER",
  "accountType": "checking",
  "holderName": "Gerardo Ratto",
  "accountNumber": "0070327530004025541644",
  "metadata": {
    "cuit": "20221370075"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `country` | string | ✅ | `AR` for Argentina |
| `currency` | string | ✅ | `ARS` |
| `rail` | string | ✅ | Use `OTHER` for CBU/CVU transfers |
| `accountType` | string | ✅ | `checking` or `savings` |
| `holderName` | string | ✅ | Account holder name |
| `accountNumber` | string | — | 22-digit CBU or CVU |
| `metadata` | object | — | Store extra data like CUIT/CUIL here |

### Response

```json
{
  "bankAccountId": "ba_67890",
  "customerId": "cust_12345",
  "country": "AR",
  "currency": "ARS",
  "rail": "OTHER",
  "accountNumberLast4": "1644",
  "accountType": "checking",
  "holderName": "Gerardo Ratto",
  "createdAt": "2026-02-25T12:00:00Z"
}
```

---

## Use in a payout

Reference the customer in `POST /payouts` by setting `customerId`:

```json
{
  "amount": "5000.00",
  "currency": "ARS",
  "destinationCbu": "0070327530004025541644",
  "customerId": "cust_12345"
}
```

This links the payout to the customer record for tracking and reporting (visible in `last_out` timestamp on the customer).

---

## Retrieve a customer

`GET /customers/{customerId}`

```http
GET /customers/cust_12345
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## List customers

`GET /customers`

```http
GET /customers?limit=50
Authorization: Bearer sk_live_<your-merchant-key>
```

### Query parameters

| Parameter | Description |
|-----------|-------------|
| `limit` | Max results (1–200, default 50) |
| `startingAfter` | Cursor-based pagination (customer ID) |

---

## List bank accounts

`GET /customers/{customerId}/bank-accounts`

Returns all bank accounts registered for a customer.
