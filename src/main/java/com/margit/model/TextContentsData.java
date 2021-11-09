package com.margit.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TextContentsData {
	private String title;
	private MultipartFile titleImgFile;
	private String textContent;
}
