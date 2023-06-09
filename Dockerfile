FROM node:14

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY .env .

COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
