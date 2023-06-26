FROM node:18.16.0

WORKDIR /app

COPY ./src/package.json ./
COPY ./src/package-lock.json ./

RUN npm i

COPY ./src/ ./
RUN ln -s /app/prisma /data
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
