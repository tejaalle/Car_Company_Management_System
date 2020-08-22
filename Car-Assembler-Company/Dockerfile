FROM node:latest
WORKDIR /cloud
COPY package.json /cloud
RUN npm  install
COPY . /cloud
CMD ["npm","start"]
EXPOSE 1337