FROM node:18

RUN mkdir app

WORKDIR /app

COPY package*.json .

EXPOSE 8080

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]