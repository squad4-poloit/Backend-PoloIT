FROM node:20.16 AS builder

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node . .

USER node

RUN npm ci

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

FROM node:20.16

WORKDIR /home/app

COPY --from=builder  --chown=node:node /home/app ./

CMD ["npm", "run", "start"]
