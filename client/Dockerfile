FROM node:alpine

#to make create react app work correctly
ENV CI=true

WORKDIR /usr/app

COPY ./package.json ./
RUN npm i
COPY ./ ./

CMD [ "npm","start" ]