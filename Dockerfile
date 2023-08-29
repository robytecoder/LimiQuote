FROM node:latest
RUN mkdir -p /usr/src/app/server
RUN npm install -g nodemon
COPY ./app/server/package.json /usr/src/app/server
COPY ./app/server/package-lock.json /usr/src/app/server
WORKDIR /usr/src/app/server
RUN npm install
RUN mkdir -p /usr/src/app/client
COPY ./app/client /usr/src/app/client
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
COPY ./app /usr/src/app
EXPOSE 3000
WORKDIR /usr/src/app/server
CMD ["node", "app.js"]