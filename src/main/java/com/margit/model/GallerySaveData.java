package com.margit.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class GallerySaveData {

	private String galleryCategory;
	private String group;
	private String photoName;
	private String photoExpl;
	private MultipartFile imgFile;
	
	
}
