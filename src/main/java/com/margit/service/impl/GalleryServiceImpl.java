package com.margit.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.margit.dao.GalleryDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryViewData;
import com.margit.service.GalleryService;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	GalleryDao galleryDao;
	
	@Override
	public List<GalleryGroupNameInterface> getGalleryData(String galleryCategory) {
		
		
		List<GalleryGroupNameInterface> galleryGroupName = 
				galleryDao.getGroupName(galleryCategory);
		System.out.println("GalleryServiceImpl --: "+galleryGroupName);
		
		return galleryGroupName;
	}
	
	private List<GalleryGroupNameInterface> getGalleryGroupName(String galleryCategory){
		return galleryDao.getGroupName(galleryCategory);
		 
	}

}
