package com.example.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class WelcomeController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/")
    public ModelAndView welcome(Authentication auth) {
        if (auth != null) {
            List<String> roles = getUserRoles(auth);
            log.info("**** Spring Boot Demo ****");
            log.info("User Roles: " + roles.toString());

            ModelAndView model = new ModelAndView("welcome");
            model.addObject("time", new Date());
            model.addObject("message", "Spring Boot Demo App");
            return model;
        }
        else {
            return new ModelAndView("login");
        }
        //return "welcome";
    }

    @RequestMapping(value = "/test")
    public String test(Model model) {
        log.info("**** Test React JS ****");
        model.addAttribute("time", new Date());
        model.addAttribute("appJs", "test.js");
        return "test";
    }

    @RequestMapping(value = "/testJade")
    public String testJade(Model model) {
        log.info("**** Test Jade Template ****");
        model.addAttribute("time", new Date());
        model.addAttribute("appJs", "test.js");
        return "testJade";
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

//	@RequestMapping(value="/logout", method = RequestMethod.GET)
//	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
//	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//	    if (auth != null){
//	        new SecurityContextLogoutHandler().logout(request, response, auth);
//	    }
//	    return "redirect:/login?logout";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
//	}

    private List<String> getUserRoles(Authentication auth) {
        List<String> roles = new ArrayList<String>();
        for (GrantedAuthority authority : auth.getAuthorities()) {
            roles.add(authority.getAuthority());
        }
        return roles;
    }
}
