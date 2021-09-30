package com.margit.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Gallery {

	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int galleryFileId;
	private String galleryCategory;
	private String photoName;
	private String photoExpl;
	private int photoOrderNo;
	private String group;
	private int groupOrderNo;
	
}
