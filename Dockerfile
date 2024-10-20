FROM node:20.16 AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

RUN chown -R node:node /home/node/app

COPY --chown=node:node . .

USER node

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

FROM node:20.16

WORKDIR /home/app

COPY --from=builder /home/app ./

RUN chown -R node:node /home/app

USER node

CMD ["npm", "run", "start"]
