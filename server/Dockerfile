FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache openssl
RUN npm install -g pnpm@10.25.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY scripts/setup scripts/setup
COPY server/src/package.json server/src/package.json
COPY server/src/prisma server/src/prisma
COPY server/src/client/package.json server/src/client/package.json

RUN LEFTHOOK=0 pnpm install --frozen-lockfile

COPY server/src server/src

RUN pnpm --filter ocean-wave-client build

FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl
RUN npm install -g pnpm@10.25.0

COPY --from=build /app ./

WORKDIR /app/server/src

EXPOSE 44100

RUN ln -s /app/server/src/prisma/data /data
RUN ln -s /app/server/src/cache /cache
RUN ln -s /app/server/src/music /music

ENTRYPOINT ["pnpm"]
CMD ["start"]
