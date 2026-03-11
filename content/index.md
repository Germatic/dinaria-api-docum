# Dinaria API

Move money across payment methods, currencies, and payout rails through a single unified API.

---

## Get Started

| | |
|---|---|
| [**Quickstart**](#40_quickstart.md) | Get your first payment running in minutes. |
| [**15-Minute Integration**](#41_15_minute_integration.md) | Full end-to-end integration walkthrough. |
| [**Common Pitfalls**](#42_common_pitfalls.md) | Errors developers hit most often and how to avoid them. |

---

## Core Concepts

| | |
|---|---|
| [**Money Movement Model**](#30_money_movement_model.md) | How funds flow through the platform — accounts, balances, and settlement. |
| [**Participants**](#31_participants.md) | Merchants, payers, and beneficiaries explained. |
| [**FX Handling**](#32_fx.md) | How foreign-exchange rates are applied and locked. |
| [**Data Formats**](#13_data_formats_iso.md) | Currency codes, amounts, timestamps, and identifiers. |

---

## Configuration

| | |
|---|---|
| [**Merchant Settings**](#06_merchant_settings.md) | Expiration windows, refund policy, payout flags, and more. |

---

## Money In

| | |
|---|---|
| [**Overview**](#04_payments_overview.md) | What a Dinaria payment is and how it works end-to-end. |
| [**Getting Started**](#01_getting_started.md) | Base URLs, authentication, and your first API call. |
| [**Quickstart: First Payment**](#02_quickstart_first_payment.md) | Step-by-step guide to creating a payment. |
| [**Payment Lifecycle**](#03_payment_lifecycle_states.md) | All states a payment goes through from creation to settlement. |
| [**Create a Payment**](#05_payments_create.md) | Request reference for `POST /payments`. |
| [**Redirect Flow**](#06_payments_redirect_flow.md) | How to redirect payers to complete payment. |
| [**Retrieve a Payment**](#07_payments_retrieve.md) | Polling and fetching payment status. |
| [**Errors & Retries**](#12_errors_and_retries.md) | Error codes, retry strategy, and idempotency. |
| [**Best Practices**](#14_payment_best_practices.md) | Recommendations for reliability and reconciliation. |
| [**Step-by-Step Example**](#15_step_by_step_payment_example.md) | A complete flow from order creation to confirmed receipt. |

---

## Money Out

| | |
|---|---|
| [**Overview**](#16_payouts_overview.md) | Payout capabilities and supported rails. |
| [**Payout Flow**](#33_payout_flow.md) | How a payout moves from request to bank credit. |
| [**Create a Payout**](#17_payouts_create.md) | Request reference for `POST /payouts`. |
| [**Retrieve & List Payouts**](#18_payouts_retrieve.md) | Fetch payout status and history. |

---

## Webhooks

| | |
|---|---|
| [**Overview**](#08_webhooks_overview.md) | What events Dinaria emits and when. |
| [**Registration**](#09_webhooks_registration.md) | Register your endpoint to receive events. |
| [**Receiving**](#10_webhooks_receiving.md) | Processing incoming webhook payloads. |
| [**Security**](#13_webhooks_security.md) | Signature verification and replay protection. |
| [**Verification Examples**](#11_verification_examples.md) | Code samples for verifying signatures in multiple languages. |
| [**Best Practices**](#11_webhooks_best_practices.md) | Reliability, ordering, and idempotency for event handlers. |
| [**Rotate Secret**](#11_rotate-webhook-secret.md) | How to rotate your webhook signing secret safely. |
| [**Event Types**](#35_webhook_event_types.md) | Full catalogue of event types and their payloads. |

---

## API Reference

The full OpenAPI specification is available in the [**API Reference**](#apiref) section.
