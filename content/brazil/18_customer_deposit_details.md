# Deposit Details

`GET /customers/{customerId}/deposit-details`

Returns the PIX key and reference code a customer must use to fund their virtual account via a PIX transfer.

---

## Request

```http
GET /customers/cust_br_12345/deposit-details
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## Response

```json
{
  "method": "pix",
  "currency": "BRL",
  "cbu": null,
  "alias": null,
  "pixKey": "pagamentos@dinaria.com",
  "pixKeyType": "email",
  "reference": "REF-cust_br_12345",
  "instructions": "Send BRL via PIX to pagamentos@dinaria.com and include the reference code in the PIX message (mensagem). Your balance will be credited within seconds."
}
```

### Fields

| Field | Description |
|-------|-------------|
| `pixKey` | Dinaria's PIX key. This is the destination for all customer deposits in Brazil. |
| `pixKeyType` | Type of PIX key: `email`, `cpf`, `cnpj`, `phone`, or `random`. |
| `reference` | **Must be included in the PIX message (mensagem).** Used to attribute the deposit to this customer's virtual account. |
| `instructions` | Ready-to-display text for your UI. |

---

## How to use this

1. Call this endpoint to get the PIX key and reference.
2. Display the following to your customer:

> **PIX transfer details**
> - Chave PIX: `pagamentos@dinaria.com`
> - Mensagem: `REF-cust_br_12345` ← include this in the PIX message
> - Moeda: BRL

3. The customer initiates the PIX from their bank or wallet app.
4. Dinaria receives the PIX, reads the reference from the mensagem, and credits the customer's virtual account.
5. Poll `GET /customers/{id}/balance` or listen to the `customer.balance.credited` webhook to confirm.

---

## Important

- The **reference code is mandatory** for correct attribution. If a customer omits it from the mensagem, the deposit falls to the merchant's default balance and requires manual reconciliation.
- All deposits go to **Dinaria's single PIX key** — there are no individual PIX keys per customer.
- PIX credits are near-instant — balance typically updates within seconds of the transfer.
- The reference code is stable — it does not expire or change for a given customer.
