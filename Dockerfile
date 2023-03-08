FROM node:18.12.1-alpine
WORKDIR /messenger
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server.js
