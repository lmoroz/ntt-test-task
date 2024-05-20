FROM node:20-alpine AS base

FROM base as dependencies
WORKDIR /app

COPY frontend/package*.json ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f package.json ]; then npm i; \
  else echo "Package or lockfile not found." && exit 1; \
  fi


FROM base as builder
WORKDIR /app

COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./
COPY frontend/.env.production ./
COPY frontend/.eslintrc.json ./
COPY frontend/tsconfig.json ./
COPY frontend/tsconfig.node.json ./
COPY frontend/vite.config.mts ./
COPY frontend/package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build
RUN npm prune

FROM nginx:latest

WORKDIR /var/www/html
COPY frontend/conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=www-data:www-data /app/dist/  /var/www/html/

EXPOSE ${FRONTEND_PORT}

CMD ["nginx", "-g", "daemon off;"]
