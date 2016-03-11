package com.example.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Controller;
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
}
