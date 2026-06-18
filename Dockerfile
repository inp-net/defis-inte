# use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# this will cache them and speed up future builds
# install with --production (exclude devDependencies)
FROM base AS install-prod
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

WORKDIR /usr/src/app

COPY . .

RUN bunx prisma generate

RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY . .

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER bun

EXPOSE 3000/tcp

ENTRYPOINT ["./entrypoint.sh"]



