FROM node:12-alpine

WORKDIR /app

COPY . /app

EXPOSE 3001

CMD ["npm", "run", "start"]