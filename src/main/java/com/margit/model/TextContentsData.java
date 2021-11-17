package com.margit.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TextContentsData {
	
	private int id;
	private int orderNo;
	private String title;
	private MultipartFile titleImgFile;
	private String textContent;
}
