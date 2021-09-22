package com.margit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.margit.model.Contact;
import com.margit.model.User;
import com.margit.service.ContactService;
import com.margit.service.JoinService;

@Controller
public class PageController {

	@Autowired
	private JoinService joinService;
	@Autowired
	private ContactService contactService;
	
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

	@GetMapping({"/presse"})
	public String presse() {
		return "presse";
	}
	
	@GetMapping({"/biography"})
	public String biography() {
		return "biography";
	}
	
	@ResponseBody
	@GetMapping({"/biography.ajax"})
	public String biography_ajax() {
		return "biography";
	}

	@GetMapping({"/contact"})
	public String contact() {
		
		return "contact";
	}
	
	@ResponseBody
	@GetMapping({"/contact.ajax"})
	public Contact contact_ajax(){
		Contact contactData = contactService.getContact();
//		System.out.println("contactData : "+contactData);
//		
//		Map<String, Object> lists = new HashMap<String, Object>();
//		lists.put("contactData", contactData);
//		System.out.println("lists : "+lists);
//		
//		ObjectMapper objectMapper = new ObjectMapper();
//		String json = objectMapper.writeValueAsString(contactData);
//		System.out.println("json : "+ json);
		return contactData;
	}
	
	@GetMapping({"/update"})
	public String update() {
		return "update";
	}

	@GetMapping({"/loginForm"})
	public String loginForm() {
		return "loginForm";
	}
	
	@GetMapping({"/joinForm"})
	public String joinForm() {
		return "join";
	}

	@PostMapping({"/joinPrc"})
	public String joinPrc(User user) {
		System.out.println(user);
		String aa = joinService.joinMember(user);
		System.out.println(aa);
		return "redirect:/loginForm";
	}
}
