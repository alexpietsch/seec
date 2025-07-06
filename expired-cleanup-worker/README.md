# expired-cleanup-worker

A Rust program running alongside the seec backend and database to regularly delete expired secrets.

## Usage with docker compose

Add a service entry to your `docker-compose.yaml` and pass the same `SPRING_DATASOURCE_URL` used by the backend as the command argument:

```yaml
  cleanup-worker:
    image: ghcr.io/alexpietsch/expired-cleanup-worker:latest
    depends_on:
      - backend
    command: ["${SPRING_DATASOURCE_URL}"]
```

`SPRING_DATASOURCE_URL` must be set to a valid PostgreSQL connection string (e.g. `jdbc:postgresql://db:5432/seec?user=seec&password=seec-pw`). The worker will periodically remove entries whose `auto_expire_at` has passed.
