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
  
  ...
  
  <plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
      <fork>true</fork>
    </configuration>
  </plugin>

```

### JPA and H2 Embedded Database 

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

### Configure logback.xml

```
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE xml>
  <configuration>
    <include resource="org/springframework/boot/logging/logback/base.xml"/>
  </configuration>

```

### Spring Security

```
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
	</dependency>

```

### QueryDSL for JPA

```
	<dependency>
		<groupId>com.querydsl</groupId>
	  	<artifactId>querydsl-apt</artifactId>
	  	<version>${querydsl.version}</version>
	  	<scope>provided</scope>
	</dependency>	
	<dependency>
		<groupId>com.querydsl</groupId>
		<artifactId>querydsl-jpa</artifactId>
		<version>${querydsl.version}</version>
	</dependency>
	
	...
	
	<plugin>
      <groupId>com.mysema.maven</groupId>
      <artifactId>apt-maven-plugin</artifactId>
      <version>1.1.3</version>
      <executions>
        <execution>
          <goals>
            <goal>process</goal>
          </goals>
          <configuration>
            <outputDirectory>target/generated-sources/java</outputDirectory>
            <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
          </configuration>
        </execution>
      </executions>
    </plugin>
	
```
### JSP View Template

```
	<dependency>
		<groupId>org.apache.tomcat.embed</groupId>
		<artifactId>tomcat-embed-jasper</artifactId>
		<scope>provided</scope>
	</dependency>
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>jstl</artifactId>
	</dependency>
	
```
