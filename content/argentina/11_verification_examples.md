---
title: Verification Examples
nav_order: 0
---

# Verification Examples

This page provides example patterns for verifying webhook authenticity.

Dinaria webhooks should be verified using the webhook secret configured for your endpoint.

## Example: HMAC signature verification

The typical pattern is:

1. Read the raw request body (bytes)
2. Compute HMAC with your webhook secret
3. Compare with the signature header using a constant-time comparison

> The exact header name and signature format are defined in **Webhook Security**.

## Minimal pseudo-code

- payload = raw_body
- expected = HMAC_SHA256(secret, payload)
- assert constant_time_equal(expected, signature_from_header)

## Recommended references

- See **Webhook Security** for the canonical header names and signing rules.
- See **Rotate Secret** for safe secret rotation patterns.
