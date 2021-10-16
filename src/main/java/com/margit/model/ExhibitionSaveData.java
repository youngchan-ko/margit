package com.margit.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ExhibitionSaveData {

	private String exhibitionTitle;
	private String exhibitionDate;
	private String exhibitionPlace;
	private String exhibitionLink;
	private MultipartFile imgFile;
	
	
}
