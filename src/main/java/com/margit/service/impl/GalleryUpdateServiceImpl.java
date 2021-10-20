package com.margit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;
import com.margit.service.GalleryUpdateService;

@Service
public class GalleryUpdateServiceImpl implements GalleryUpdateService {
	
	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	
	@Override
	public List<GalleryGroupNameInterface> getGallerygroupName (String galleryCategory) {
		List<GalleryGroupNameInterface> galleryGroupName = 
				galleryDao.getGroupName(galleryCategory);
		
		return galleryGroupName;
	}

	@Override
	public GalleryModifyData getPhotoDetailData(int galleryId) {
		Gallery gallery = galleryDao.getById(galleryId);
		System.out.println(gallery);
		GalleryFile galleryFile = galleryFileDao.getById(gallery.getGalleryFileId());
		System.out.println(galleryFile);
		GalleryModifyData galleryModifyData = new GalleryModifyData();
		galleryModifyData.setGallery(gallery);
		galleryModifyData.setGalleryFile(galleryFile);
		System.out.println(galleryModifyData);
		return galleryModifyData;
	}

}
