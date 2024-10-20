FROM node:20.16 AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

RUN npx prisma generate
RUN /wait-for-it.sh db_default:5432 --timeout=60 --strict -- npx prisma migrate deploy
RUN npm run build

FROM node:20.16

WORKDIR /home/app

COPY --from=builder /home/app ./

CMD ["npm", "run", "start"]
