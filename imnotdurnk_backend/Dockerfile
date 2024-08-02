FROM gradle:8.7.0-jdk21-alpine AS build

WORKDIR /app

COPY build.gradle settings.gradle ./

RUN gradle dependencies --no-daemon

COPY . /app

RUN gradle clean build --no-daemon

FROM openjdk:21

WORKDIR /app

ARG JAR_FILE=/app/build/libs/*.jar

COPY --from=build ${JAR_FILE} /app/imnotdurnk-backend.jar

ENTRYPOINT ["java"]
CMD ["-jar", "imnotdurnk-backend.jar"]