package com.margit.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.PhotoData;
import com.margit.service.GalleryService;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	
	@Override
	public List<PhotoData> getGalleryPhotoData(String galleryCategory, String groupName) {
		
		List<PhotoData> photoData = new ArrayList<PhotoData>();
		List<Gallery> gallery= galleryDao.getGroupPhotoData(galleryCategory, groupName);
		for(Gallery currentGallery : gallery) {
			PhotoData currentPhotoData = new PhotoData();
			
			currentPhotoData.setId(currentGallery.getId());
			currentPhotoData.setPhotoOrderNo(currentGallery.getPhotoOrderNo());
			currentPhotoData.setPhotoName(currentGallery.getPhotoName());
			currentPhotoData.setPhotoExpl(currentGallery.getPhotoExpl());
			currentPhotoData.setGalleryFileId(currentGallery.getGalleryFileId());
			GalleryFile currentGalleryFile = galleryFileDao.findById(currentGallery.getGalleryFileId());
			currentPhotoData.setFileName(currentGalleryFile.getFileName());
			
			photoData.add(currentPhotoData);
		}
		
		return photoData;
	}
	
	private List<GalleryGroupNameInterface> getGalleryGroupName(String galleryCategory){
		return galleryDao.getGroupName(galleryCategory);
		 
	}

}
