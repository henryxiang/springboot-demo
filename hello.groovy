/**
 This is the simplest application that Spring Boot can run.
 Just type in the following command:

    spring run hello.groovy

**/

@RestController
class WebApplication {
 
  @RequestMapping("/")
  String home() {
    "Hello World!"
  }

}
