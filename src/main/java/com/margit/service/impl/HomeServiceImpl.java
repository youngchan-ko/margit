package com.margit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.ExhibitionDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Exhibition;
import com.margit.model.GalleryFile;
import com.margit.model.HomeViewData;
import com.margit.service.HomeService;

@Service
public class HomeServiceImpl implements HomeService{

	@Autowired
	GalleryFileDao galleryFileDao;
	@Autowired
	ExhibitionDao exhibitionDao;
	@Override
	public HomeViewData getmainImg() {
		GalleryFile galleryFile = galleryFileDao.getRandomImg();
		Exhibition exhibition = exhibitionDao.findById(1).orElse(null);
		
		HomeViewData homeViewData = new HomeViewData();
		homeViewData.setGalleryFile(galleryFile);
		homeViewData.setExhibition(exhibition);
		return homeViewData;
	}

}
