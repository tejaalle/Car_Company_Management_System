FROM node:9-slim
WORKDIR /cloudAssignment
COPY package.json /cloudAssignment
RUN npm install
COPY . /cloudAssignment
CMD ["npm","start"]
EXPOSE 1337