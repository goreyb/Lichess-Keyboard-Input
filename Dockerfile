FROM node:16

WORKDIR /usr/src/Lichess-Keyboard-Input/Extension (drag this folder into Chrome)

COPY package*.json ./

RUN npm install
