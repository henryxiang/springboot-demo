package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class WelcomeController {
	@RequestMapping(value="/")
	public String hello() {
		log.info("*** welcome ***");
		return "Hello Spring!";
	}
}
