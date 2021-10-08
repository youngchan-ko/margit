package com.margit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.service.GalleryUpdateService;

@Service
public class GalleryUpdateServiceImpl implements GalleryUpdateService {
	
	@Autowired
	GalleryDao galleryDao;
	
	public List<GalleryGroupNameInterface> getGallerygroupName (String galleryCategory) {
		List<GalleryGroupNameInterface> galleryGroupName = 
				galleryDao.getGroupName(galleryCategory);
		
		return galleryGroupName;
	}

}
