package com.margit.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class GalleryUpdateData {

	
	private int galleryId;
	private String galleryCategory;
	private String groupName;
	private String photoName;
	private String photoExpl;
	private MultipartFile imgFile;
	
	
}
