package com.margit.service;

import org.springframework.web.multipart.MultipartFile;

import com.margit.model.TextImgSaveData;

public interface TextImgSaveService {

	public String saveTextImgFile(MultipartFile textImgSaveData);

}
