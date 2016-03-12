package com.example.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class WelcomeController {
	@RequestMapping(value="/")
	public String welcome(Map<String, Object> model) {
		log.info("*** welcome from Spring ***");
		model.put("time", new Date());
		model.put("message", "Hello Spring!");
		return "welcome";
	}
	
	@RequestMapping(value="/test")
	public String test(Model model) {
		log.info("*** Test React JS ***");
		model.addAttribute("time", new Date());
		model.addAttribute("appJs", "test.js");
		return "test";
	}
}
