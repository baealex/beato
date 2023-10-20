FROM baealex/beato-base:latest

WORKDIR /app

COPY ./src/ ./

RUN cd client && git clone https://github.com/baealex/beato ./dist && cd beato && git checkout client

RUN ln -s /app/prisma/data /data
RUN ln -s /app/cache /cache
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
