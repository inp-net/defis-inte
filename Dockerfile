# use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

#install xith dev dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# this will cache them and speed up future builds
# install with --production (exclude devDependencies)
FROM base AS install-prod
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# builde de l'application
FROM base AS builder
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bunx svelte-kit sync
RUN bunx prisma generate
RUN bun run build

# On fait tout propre pour avoir une image légere image finale 
FROM base AS release
RUN apt-get update && apt-get install -y --no-install-recommends openssl ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY --from=install-prod /temp/prod/node_modules node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package.json bun.lock ./
COPY prisma.config.ts ./prisma.config.ts
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

RUN mkdir -p /usr/src/app/uploads && chown -R bun:bun /usr/src/app/uploads
USER bun

EXPOSE 3000/tcp

ENTRYPOINT ["./entrypoint.sh"]