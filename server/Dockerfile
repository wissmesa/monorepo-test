FROM node:16-alpine AS base
WORKDIR /usr/src/app/server
COPY ./server/package.json .

FROM base AS install
RUN mkdir -p /temp/dev-server/
COPY ./server/package.json .
RUN cd /temp/dev-server && npm install —frozen-lockfile

FROM base AS prerelease
COPY —from=install /temp/dev-server/node_modules 
COPY . .

USER NPM
EXPOSE 3000/tcp
ENTRYPOINT [ “npm”, “run”, “index.js” ]