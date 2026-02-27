# Deposit Details

`GET /customers/{customerId}/deposit-details`

Returns the CBU and reference code a customer must use to fund their virtual account via a CBU bank transfer.

---

## Request

```http
GET /customers/cust_12345/deposit-details
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## Response

```json
{
  "method": "bank_transfer",
  "currency": "ARS",
  "cbu": "4310009922100000122004",
  "alias": "DINARIA.PAGOS",
  "pixKey": null,
  "pixKeyType": null,
  "reference": "REF-cust_12345",
  "instructions": "Transfer ARS to the above CBU and include the reference code in the payment description (concepto). Your balance will be credited within minutes."
}
```

### Fields

| Field | Description |
|-------|-------------|
| `cbu` | Dinaria's Argentine CBU. This is the destination for all customer deposits. |
| `alias` | Human-friendly alias for the CBU. |
| `reference` | **Must be included in the transfer description (concepto).** Used to attribute the deposit to this customer's virtual account. |
| `instructions` | Ready-to-display text for your UI. |

---

## How to use this

1. Call this endpoint to get the CBU and reference.
2. Display the following to your customer:

> **Bank transfer details**
> - CBU: `4310009922100000122004`
> - Alias: `DINARIA.PAGOS`
> - Reference: `REF-cust_12345` ← include this in the description
> - Currency: ARS

3. The customer initiates a transfer from their bank to Dinaria's CBU.
4. Dinaria's reconciler receives the transfer, reads the reference, and credits the customer's virtual account.
5. Poll `GET /customers/{id}/balance` or listen to the `customer.balance.credited` webhook to confirm.

---

## Important

- The **reference code is mandatory** for correct attribution. If a customer omits it, the deposit falls to the merchant's default balance and requires manual reconciliation.
- All deposits go to **Dinaria's single CBU** — there are no individual CBUs per customer.
- The reference code is stable — it does not expire or change for a given customer.
