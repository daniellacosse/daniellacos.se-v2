FROM mhart/alpine-node:latest

WORKDIR /app
COPY build ./

RUN npm install --production

EXPOSE 9999
CMD [ "node", "server.js" ]