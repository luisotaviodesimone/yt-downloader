# Estágio de build
FROM node:22-alpine AS build

LABEL org.opencontainers.image.source=https://github.com/luisotaviodesimone/yt-downloader
LABEL org.opencontainers.image.description="vite"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

# Copiar o restante do código-fonte
COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
