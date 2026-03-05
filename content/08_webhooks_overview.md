---
title: Overview
nav_order: 10
parent: Webhooks
---

# Webhooks

Webhooks deliver asynchronous notifications when the status of a payment changes.

They are the most reliable way to track payment completion.

> Webhooks are delivered **at least once**. Your integration must be idempotent.

## Two webhook concepts (important)
1. **Webhook registration (configuration)**: called by the merchant to register a URL.
2. **Webhook delivery (events)**: called by our platform to notify the merchant.
