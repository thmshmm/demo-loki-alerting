FROM golang:1.21 AS builder
RUN mkdir /build
WORKDIR /build
RUN go install go.k6.io/xk6/cmd/xk6@latest && \
    git clone https://github.com/grafana/xk6-loki && \
    cd xk6-loki && \
    make k6

FROM alpine:latest
COPY --from=builder /build/xk6-loki/k6 /usr/bin/
