FROM baealex/beato-base:latest

WORKDIR /app

COPY ./src/ ./

RUN git clone https://github.com/baealex/beato ./client/dist && \
    cd ./client/dist && \
    git checkout client && \
    rm -rf .git

RUN ln -s /app/prisma/data /data
RUN ln -s /app/cache /cache
RUN ln -s /app/music /music

ENTRYPOINT ["npm", "run"]
CMD ["start"]
