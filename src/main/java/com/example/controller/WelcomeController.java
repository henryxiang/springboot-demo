package com.example.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class WelcomeController {
	@RequestMapping(value="/hello")
	public String hello() {
		return "Hello Spring Boot!";
	}
	
	@RequestMapping(value="/user/{name}")
	public String user(@PathVariable String name) {
		log.info(String.format("name = %s", name));
		return "Welcome " + name;
	}
}
