# Etapa 1: Construir a aplicação
FROM node:18-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para dentro do container
COPY package*.json ./
COPY vite.config.js ./
COPY . .

# Instalar dependências
RUN npm install

# Construir o projeto
RUN npm run build

# Etapa 2: Servir a aplicação com um servidor nginx
FROM nginx:alpine

# Copiar os arquivos de build do Vite para o diretório que será servido pelo NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
