FROM node:20.16

WORKDIR /home/app

COPY . /home/app/

RUN npm install

EXPOSE 3000

CMD ["node", "/home/app/src/index.js"]