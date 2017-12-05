FROM node:boron

RUN mkdir -p /opt/web/api
WORKDIR /opt/web/api

COPY ./api .
RUN npm install
# RUN npm install --save react react-dom
# RUN npm install --save react-bootstrap
# RUN npm install --save babel-preset-react

VOLUME /opt/web/api/node_modules/

EXPOSE 3000