package com.margit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.margit.model.User;

@Controller
public class PageController {

	@GetMapping({"", "/"})
	public String index() {
		return "index";
	}
	
	@GetMapping({"/skulptur"})
	public String skulptur() {
		return "skulptur";
	}
	
	@GetMapping({"/zeichnung"})
	public String zeichnung() {
		return "zeichnung";
	}
	
	@GetMapping({"/objekt"})
	public String objekt() {
		return "objekt";
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
	
	@GetMapping({"/update"})
	public String update() {
		return "update";
	}

	@GetMapping({"/loginFrom"})
	public String loginForm() {
		return "loginFrom";
	}
	
	@GetMapping({"/joinForm"})
	public String joinForm() {
		return "join";
	}

	@PostMapping({"/joinPrc"})
	public @ResponseBody String joinPrc(User user) {
		System.out.println(user);
		return "join";
	}
}
