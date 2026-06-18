#!/bin/sh
set -e

bunx prisma migrate deploy

exec node server.js
