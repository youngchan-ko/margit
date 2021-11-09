package com.margit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
 
@Entity
@Data
public class TextContents {
	
	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private int titlePhotoId;
	private String contentText;
	private int orderNo;
	
	
}
