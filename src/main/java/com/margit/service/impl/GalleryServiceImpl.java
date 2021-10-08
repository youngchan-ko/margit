package com.margit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryViewData;
import com.margit.service.GalleryService;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	GalleryDao galleryDao;
	
	@Override
	public List<GalleryViewData> getGallerygroupName(String galleryCategory) {
		List<GalleryGroupNameInterface> getGalleryGroupName = getGalleryGroupName(galleryCategory);
		
		return null;
	}
	
	private List<GalleryGroupNameInterface> getGalleryGroupName(String galleryCategory){
		return galleryDao.getGroupName(galleryCategory);
		 
	}

}
