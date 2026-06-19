#!/bin/sh
set -e


bunx prisma migrate deploy

exec bun run build/index.js
