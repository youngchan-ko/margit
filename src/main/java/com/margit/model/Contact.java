package com.margit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
 
@Entity
@Data
public class Contact {
	
	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String street;
	private String houseNumber;
	private String postcode;
	private String city;
	private String email;
	private String phone;
	private String homepageOwner;
	private String homepageProducer;
	private String homepageCategory;
	private String liabilityText;
	private String linksText;
	
}
