FROM node:9-slim
WORKDIR /jobPartApp
COPY package.json /jobPartApp
RUN npm install
COPY . /jobPartApp
CMD ["npm","start"]
EXPOSE 1337