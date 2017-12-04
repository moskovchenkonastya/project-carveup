FROM node:boron

RUN mkdir /opt/web/
WORKDIR /opt/web/

COPY . .
RUN npm install
RUN npm install --save react react-dom
RUN npm install --save react-bootstrap

#VOLUME /opt/web/api

EXPOSE 3000