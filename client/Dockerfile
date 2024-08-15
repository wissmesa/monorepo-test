FROM node:16-alpine AS base
WORKDIR /usr/src/app/client
COPY . .
RUN npm install --frozen-lockfile

EXPOSE 8000

CMD ["npm", "run","dev"]