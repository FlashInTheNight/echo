# Используем образ дистрибутив линукс Alpine с версией Node -14 Node.js
FROM node:19.5.0-alpine

# Указываем нашу рабочую дерикторию
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем pnpm
RUN npm install -g pnpm

# Устанавливаем глобальный каталог bin для pnpm
ENV PNPM_HOME="/usr/local/pnpm"
ENV PATH="/usr/local/pnpm:${PATH}"

# Устанавливаем зависимости
RUN pnpm install

# Копируем оставшееся приложение в контейнер
COPY . .

# Устанавливаем Prisma
RUN pnpm install -g prisma

# Генерируем Prisma client
RUN prisma generate

# Копируем Prisma schema и URL базы данных в контейнер
COPY prisma/schema.prisma ./prisma/

# Открываем порт 3000 в нашем контейнере
EXPOSE 3000

# Запускаем сервер
CMD [ "pnpm", "start" ]
