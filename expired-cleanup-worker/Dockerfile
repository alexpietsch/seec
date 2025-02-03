FROM rust:1.83.0-slim AS build

RUN rustup target add x86_64-unknown-linux-musl && \
    apt update && \
    apt install -y musl-tools musl-dev && \
    update-ca-certificates

COPY ./src ./src
COPY ./Cargo.lock .
COPY ./Cargo.toml .

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid 10001 \
    "rustuser"

RUN cargo build --target x86_64-unknown-linux-musl --release

FROM rust:1.83-alpine3.21 AS runtime

COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /etc/group /etc/group

USER rustuser:rustuser

COPY --from=build --chown=rustuser:rustuser ./target/x86_64-unknown-linux-musl/release/expired-cleanup-worker /app/expired-cleanup-worker

ENTRYPOINT [ "./app/expired-cleanup-worker" ]
