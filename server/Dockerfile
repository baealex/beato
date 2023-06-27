FROM node:18.16.0

WORKDIR /app

COPY ./src/package.json ./
COPY ./src/package-lock.json ./
COPY ./src/client/package.json ./client/

RUN npm i

COPY ./src/ ./

RUN npm run build:client

RUN ln -s /app/prisma /data
RUN ln -s /app/cache /cache
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
