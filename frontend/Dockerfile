FROM node:20-alpine AS base

FROM base as dependencies
WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f package.json ]; then npm i; \
  else echo "Package or lockfile not found." && exit 1; \
  fi


FROM base as builder
WORKDIR /app

COPY .env ./
COPY frontend/src ./src
COPY frontend/static ./static
COPY frontend/tsconfig.json ./
COPY frontend/tsconfig.node.json ./
COPY frontend/vite.config.mts ./
COPY frontend/global.d.ts ./
COPY frontend/package.json frontend/package-lock.json* ./
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build
RUN npm prune


FROM nginx:latest

# Устанавливаем рабочую директорию для Nginx
WORKDIR /usr/share/nginx/html

# Копируем файл конфигурации Nginx
COPY frontend/conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=www-data:www-data /app/dist/*  /usr/share/nginx/html/

# Открываем 80-й порт для входящих подключений
EXPOSE ${FRONTEND_PORT}

# Запускаем nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]