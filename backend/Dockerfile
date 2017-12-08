FROM golang

RUN mkdir -p /go/src/app
WORKDIR /go/src/app
COPY . .

RUN go get -u github.com/mattn/go-sqlite3
RUN go get -u github.com/robbert229/jwt
RUN go get -u github.com/julienschmidt/httprouter
