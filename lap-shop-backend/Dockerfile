FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN set -eux; \
	if [ -f pom.xml ]; then \
		mvn -q -DskipTests package; \
		cp -R target /build-target; \
	elif [ -f lap-shop-backend/pom.xml ]; then \
		cd lap-shop-backend; \
		mvn -q -DskipTests package; \
		cp -R target /build-target; \
	else \
		echo "pom.xml not found in expected locations"; \
		exit 1; \
	fi

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /build-target/quarkus-app/lib/ ./target/quarkus-app/lib/
COPY --from=build /build-target/quarkus-app/quarkus-run.jar ./target/quarkus-app/quarkus-run.jar
COPY --from=build /build-target/quarkus-app/app/ ./target/quarkus-app/app/
COPY --from=build /build-target/quarkus-app/quarkus/ ./target/quarkus-app/quarkus/

EXPOSE 8080
CMD ["java", "-jar", "target/quarkus-app/quarkus-run.jar"]
