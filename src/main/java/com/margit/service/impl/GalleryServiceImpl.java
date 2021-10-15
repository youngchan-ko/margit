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
import com.margit.model.GalleryViewData;
import com.margit.model.PhotoData;
import com.margit.service.GalleryService;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	
	
	@Override
	public List<GalleryViewData> getGalleryViewData (String galleryCategory) {
		
		List<GalleryViewData> galleryViewDataList = new ArrayList<GalleryViewData>();
		List<GalleryGroupNameInterface> galleryGroupName = 
				galleryDao.getGroupName(galleryCategory);
		
		for(GalleryGroupNameInterface currentGalleryGroupName : galleryGroupName) {
			GalleryViewData  galleryViewData = new GalleryViewData();
			
			List<Gallery> gallery = 
					galleryDao.getGroupPhotoData(galleryCategory, currentGalleryGroupName.getGroupName());
			
			galleryViewData.setGroupName(currentGalleryGroupName.getGroupName());
			galleryViewData.setGroupOrderNo(currentGalleryGroupName.getGroupOrderNo());
			galleryViewData.setGallery(gallery);
			
			galleryViewDataList.add(galleryViewData);
		}
		return galleryViewDataList;
	}
	

}
