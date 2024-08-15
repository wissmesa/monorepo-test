FROM node:16-alpine AS base
WORKDIR /usr/src/app/server
COPY . .
RUN npm install --frozen-lockfile

EXPOSE 3000/tcp

CMD [ "node", "index.js" ]