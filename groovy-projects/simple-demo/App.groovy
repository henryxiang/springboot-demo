@RestController
class SimpleDemoApp {
    @RequestMapping("/")
    def index() {
        "Spring Boot Demo App"
    }
}
