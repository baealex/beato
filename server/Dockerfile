FROM node:21-alpine as client

WORKDIR /app

COPY ./src/client/package.json ./
COPY ./src/client/pnpm-lock.yaml ./

RUN npx pnpm i

COPY ./src/client/ ./

RUN npm run build

FROM node:21-alpine as server

WORKDIR /app

COPY ./src/package.json ./
COPY ./src/pnpm-lock.yaml ./

RUN npx pnpm i

COPY ./src/ ./
RUN rm -rf client

FROM node:21-alpine

WORKDIR /app

COPY --from=server /app ./
COPY --from=client /app/dist ./client/dist

RUN ln -s /app/prisma/data /data
RUN ln -s /app/cache /cache
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
