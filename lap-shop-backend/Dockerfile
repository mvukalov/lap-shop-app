FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/quarkus-app/lib/ ./target/quarkus-app/lib/
COPY --from=build /app/target/quarkus-app/quarkus-run.jar ./target/quarkus-app/quarkus-run.jar
COPY --from=build /app/target/quarkus-app/app/ ./target/quarkus-app/app/
COPY --from=build /app/target/quarkus-app/quarkus/ ./target/quarkus-app/quarkus/

EXPOSE 8080
CMD ["java", "-jar", "target/quarkus-app/quarkus-run.jar"]
