# ntt-test-task

### Frontend: Vue 3 + TypeScript + Vite + Vuetify
### Backend: Golang 1.22 + PostgreSQL 16
### Спецификация Open API: http://swagger.ubiz.ru  
### Пример рабочего проекта: http://193.107.238.41
  
***
  
### Предварительная настройка  
Перед запуском проекта надо настроить .env-файлы:  
```
ntt-test-task/
├─ .env
├─ frontend/
│  ├─ .env.production
```

#### .env по образцу из .env_template:  
```dotenv
PG_HOST=postgres                       # хост, на котором будет работать postgres в докере
PG_PORT=5432                           # порт, на котором будет работать postgres
PG_USER=pguser                         # пользователь БД в докере
PG_PASSWORD=1234567                    # пароль пользователя БД в докере
PGADMIN_DEFAULT_EMAIL=admin@admin.com  # логин пользователя pgamin
PG_DB=pgdb                             # название базы данных
PG_TABLE=directories                   # название таблицы
PGADMIN_PORT=8081                      # порт для pgamin
DATA_FILE_NAME=data.json               # файл с моковыми данными, должен лежать в папке backend
API_SERVER_PORT=8080                   # внешний порт api backend сервера, к которому будет обращаться фронтенд
FRONTEND_PORT=3000                     # порт, по которому будет работать фронтенд
```

#### frontend/.env.production  
Тут надо прописать хост и порт  на которых будет работать backend api сервер  
`VITE_API_SERVER_HOST` нужно поменять только если проект будет запущен не на localhost  
`VITE_API_SERVER_PORT` должен совпадать с  `API_SERVER_PORT` из .env


### Запуск проекта:

`docker-compose up -d --build`  

***

### Запуск только бэкенда для локальной разработки на фронтенде:  

`docker-compose -f "docker-compose-without-front.yml" up -d --build'`

### Локальная разработка на фронтенде:  

1. Запустить только бэкенд в докере по п. выше
2. Добавить и настроить файл frontend/.env.development по образцу frontend/.env.production
3. Выполнить `npm ci` для установки пакетов
4. Запустить локальный dev-сервер коиандой `npm run dev`


### Перезапуск только api backend сервера, в случае проблем:  

`docker-compose build go-server && docker-compose up -d --no-deps --build go-server`
