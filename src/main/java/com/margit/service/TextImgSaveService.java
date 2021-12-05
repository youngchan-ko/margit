package com.margit.service;

import org.springframework.web.multipart.MultipartFile;

public interface TextImgSaveService {

	public String saveTextImgFile(MultipartFile textImgSaveData);

}
