package com.margit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@GetMapping({"", "/"})
	public String index() {
		return "index";
	}
	
	@GetMapping({"/gallery"})
	public String gallery() {
		return "gallery";
	}

	@GetMapping({"/text"})
	public String text() {
		return "text";
	}
	
	@GetMapping({"/biography"})
	public String biography() {
		return "biography";
	}

	@GetMapping({"/contact"})
	public String contact() {
		return "contact";
	}
}
