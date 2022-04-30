FROM node:latest
COPY ./package.json .
RUN npm i
COPY . .
CMD ["node", "index.js"]
