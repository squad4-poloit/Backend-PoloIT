FROM node:20.16 AS builder

WORKDIR /home/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

FROM node:20.16

WORKDIR /home/app

COPY --from=builder /home/app ./

CMD ["npm", "run", "start"]
