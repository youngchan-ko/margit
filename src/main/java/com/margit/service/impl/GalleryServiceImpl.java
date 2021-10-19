package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryViewData;
import com.margit.service.GalleryService;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	

	//갤러리 전체 불러오기
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
	
	@Override
	public List<Gallery> getGroupPhotoData (String galleryCategory, String groupName){

		
		List<Gallery> galleryGroupData = 
				galleryDao.getGroupPhotoData(galleryCategory, groupName);
		
		return galleryGroupData;
	}

}
