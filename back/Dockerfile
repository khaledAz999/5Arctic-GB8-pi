FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the host to the container
COPY target/Pi-1.0.jar ./Pi-1.0.jar

# Expose the port your Spring Boot app listens on (change if needed)
EXPOSE 8088

# Run the JAR file when the container starts
CMD ["java", "-jar", "Pi-1.0.jar"]