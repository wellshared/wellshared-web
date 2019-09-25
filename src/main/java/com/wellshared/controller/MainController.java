package com.wellshared.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("api/welcome")
public class MainController {

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody String getWelcome() {
        return "Welcome to Spring Boot Server!";
    }
}
