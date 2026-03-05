---
title: Errors And Retries
nav_order: 14
parent: Guides
---

# Errors & retries

## Common HTTP status codes
- `200` OK
- `201` Created
- `400` Bad Request (validation error)
- `401` Unauthorized (missing/invalid API key)
- `404` Not Found

## Retry guidance
Retry only when it is safe and meaningful:
- Network timeouts / connection issues
- Server errors (`5xx`) if returned

Do not retry:
- `400` validation errors (fix request)
- `401` authentication errors (fix credentials)
- `404` not found (fix IDs)

## Idempotency-Key
Always use `Idempotency-Key` with `POST /payments` to prevent duplicates during retries.
