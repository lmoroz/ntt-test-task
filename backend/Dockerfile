FROM golang:1.22 AS build
WORKDIR /go/src
COPY backend/go ./go
COPY backend/main.go .
COPY backend/go.mod .

ENV CGO_ENABLED=0
RUN go mod tidy
RUN go mod download

RUN go build -a -installsuffix cgo -o swagger .

FROM scratch AS runtime
COPY --from=build /go/src/swagger ./
COPY .env .
COPY backend/data.json .

ARG SERVER_PORT=8080

EXPOSE ${SERVER_PORT}/tcp
ENTRYPOINT ["./swagger"]
