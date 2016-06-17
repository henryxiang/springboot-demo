package com.example.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class WelcomeController {
	@RequestMapping(value="/")
	public ModelAndView welcome(Authentication auth) {
		List<String> roles = getUserRoles(auth);
		log.info("**** Spring Boot Demo ****");
		log.info("User Roles: " + roles.toString());
		ModelAndView model = new ModelAndView("welcome");
		model.addObject("time", new Date());
		model.addObject("message", "Spring Boot Demo App");
		return model;
		//return "welcome";
	}
	
	@RequestMapping(value="/test")
	public String test(Model model) {
		log.info("**** Test React JS ****");
		model.addAttribute("time", new Date());
		model.addAttribute("appJs", "test.js");
		return "test";
	}
	
	@RequestMapping(value="/testJade")
	public String testJade(Model model) {
		log.info("**** Test Jade Template ****");
		model.addAttribute("time", new Date());
		model.addAttribute("appJs", "test.js");
		return "testJade";
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null){    
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    return "redirect:/login?logout";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
	}
	
	private List<String> getUserRoles(Authentication auth) {
		List<String> roles = new ArrayList<String>();
		for (GrantedAuthority authority: auth.getAuthorities()) {
			roles.add(authority.getAuthority());
		}
		return roles;
	}
}
