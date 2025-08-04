# Estágio de build
FROM node:20-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências de sistema necessárias
RUN apk add --no-cache libc6-compat

# Copiar arquivos de configuração e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar o restante do código-fonte
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Estágio de produção
FROM nginx:stable-alpine AS production

# Copiar configuração personalizada do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Adicionar configuração personalizada do Nginx para SPA (Single Page Application)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
