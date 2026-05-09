FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY interactive/package.json interactive/package.json
COPY remotion/package.json remotion/package.json
COPY shared/package.json shared/package.json

RUN npm ci

COPY . .

RUN npm run build:interactive

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/interactive/dist /usr/share/nginx/html

EXPOSE 80
