package com.example.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {
	@RequestMapping(value="/hello")
	public String hello() {
		return "Hello Spring!";
	}
	
	@RequestMapping(value="/user/{name}")
	public String user(@PathVariable String name) {
		return "Welcome " + name;
	}
}
