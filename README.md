## Spring Boot Demo


### Intialized the Project

```
spring init --build=maven -d=web --packaging=war --java-version=1.8 springboot-demo

```

### Spring Boot DevTools

```
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
  </dependency>

  <plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
      <fork>true</fork>
    </configuration>
  </plugin>

```

### H2 Database and JPA 

```
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
  </dependency>

```

### Lombok

```
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.8</version>
    <scope>provided</scope>
  </dependency>

```
