FROM node:latest
COPY ./packages.json .
RUN npm i
COPY . .
CMD ["node", "index.js"]
