# Security Policy

## Supported Versions

This repository currently supports the latest version on the main branch.

## Reporting a Security Issue

If you discover a security issue in this project, please report it privately to the mentor at:

**mjaradat@nextflows.ai**

Please do not publicly disclose sensitive details before the issue has been reviewed.

## Security Hardening

This repository includes the following security protections implemented during Week 4:

- Zod validation with minimum and maximum input lengths for tool arguments.
- Filesystem path validation to prevent access outside the intended data directory.
- HTTPS-only network requests with an explicit hostname allowlist.
- Network request timeouts using AbortSignal.timeout().
- Output limits for note search and listing tools, with truncation information when results are capped.
- Tool error responses use short, user-facing messages instead of exposing raw stack traces.
- .env and .env.local files are excluded from Git, while .env.example contains placeholders only.
- No API keys or external credentials are currently required by the P0 tools.