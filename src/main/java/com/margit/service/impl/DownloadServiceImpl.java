package com.margit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryFileDao;
import com.margit.dao.TextImgFileDao;
import com.margit.model.GalleryFile;
import com.margit.model.TextImgFile;
import com.margit.service.DownloadService;

@Service
public class DownloadServiceImpl implements DownloadService{
	
	@Autowired
	GalleryFileDao galleryFileDao;
	@Autowired
	TextImgFileDao textImgFileDao;
	
	@Override
	public GalleryFile getGalleryFile(int galleryFileId) {
		GalleryFile galleryFile = galleryFileDao.findById(galleryFileId);
		return galleryFile;
	}
	
	@Override
	public TextImgFile getTextImgFile(int textImgFileId) {
		TextImgFile textImgFile = textImgFileDao.findById(textImgFileId);
		return textImgFile;
	}

}
