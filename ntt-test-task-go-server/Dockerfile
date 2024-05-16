FROM golang:1.22 AS build
WORKDIR /go/src
COPY ntt-test-task-go-server/go ./go
COPY ntt-test-task-go-server/main.go .
COPY ntt-test-task-go-server/go.mod .

ENV CGO_ENABLED=0
RUN go mod tidy
RUN go mod download

RUN go build -a -installsuffix cgo -o swagger .

FROM scratch AS runtime
COPY --from=build /go/src/swagger ./
COPY .env .
COPY data.json .

ARG SERVER_PORT=8080

EXPOSE ${SERVER_PORT}/tcp
ENTRYPOINT ["./swagger"]
