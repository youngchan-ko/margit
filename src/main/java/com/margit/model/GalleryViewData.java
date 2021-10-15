package com.margit.model;

import java.util.List;

import lombok.Data;

@Data
public class GalleryViewData {

	private String groupName;
	private int groupOrderNo;
	private List<Gallery> gallery;
	
	
	
}
