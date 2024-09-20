FROM maven:3-eclipse-temurin-17 AS builder
LABEL authors="Alexpietsch"

WORKDIR /app

COPY ./pom.xml .
COPY ./src ./src
RUN mvn clean install

FROM eclipse-temurin:17-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
