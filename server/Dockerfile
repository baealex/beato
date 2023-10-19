FROM baealex/beato-base:latest

WORKDIR /app

COPY ./src/ ./

RUN npm run build:client

RUN ln -s /app/prisma/data /data
RUN ln -s /app/cache /cache
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
