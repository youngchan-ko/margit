package com.margit.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
public class GalleryModifyData {
	@JsonIgnoreProperties({"hibernateLazyInitializer"})
	private Gallery gallery;
	@JsonIgnoreProperties({"hibernateLazyInitializer"})
	private GalleryFile galleryFile;
	
	
	
}
