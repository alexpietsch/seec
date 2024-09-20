FROM node:22 AS base
LABEL authors="Alexpietsch"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

FROM base AS builder

WORKDIR /usr/src/app

RUN npm run build

FROM nginx:stable-alpine AS server

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
