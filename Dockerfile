FROM node:20.16 AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build


FROM node:20.16

WORKDIR /home/app

COPY --from=builder /home/node/app ./

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma migrate reset && npm run start"]
