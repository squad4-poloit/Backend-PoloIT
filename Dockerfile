FROM node:20.16 AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]
