package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/home")
    public String home_page(){
        return "This is home page!";
    }
    @GetMapping("/admin")
    public String admin_page(){
        return "This is admin page!";
    }
}
