package com.margit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryFileDao;
import com.margit.model.GalleryFile;
import com.margit.service.HomeService;

@Service
public class HomeServiceImpl implements HomeService{

	@Autowired
	GalleryFileDao galleryFileDao;
	@Override
	public GalleryFile getmainImg() {
		GalleryFile galleryFile = galleryFileDao.getRandomImg();
		return galleryFile;
	}

}
