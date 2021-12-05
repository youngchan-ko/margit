package com.margit.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.service.GalleryDeleteService;

@Service
public class GalleryDeleteServiceImpl implements GalleryDeleteService{

	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	

	@Override
	@Transactional
	public int deleteGalleryFile(List<Integer> galleryId) {
		List<GalleryFile> galleryFileList= new ArrayList<GalleryFile>();
		List<Gallery> galleryList= new ArrayList<Gallery>();
		
		for(Integer currentgalleryId : galleryId) {
			Gallery gallery = new Gallery();
			gallery = galleryDao.getById(currentgalleryId);
			galleryList.add(gallery);
		}
		
		for(Gallery currentGallery : galleryList) {
			GalleryFile galleryFile = new GalleryFile();
			galleryFile = galleryFileDao.getById(currentGallery.getGalleryFileId());
			galleryFileList.add(galleryFile);
		}
		
		deletePhotoData(galleryFileList);

		for(Gallery currentGallery : galleryList) {
			galleryDao.deleteById(currentGallery.getId());
		}
		
		for(GalleryFile currentGalleryFile : galleryFileList) {
			galleryFileDao.deleteById(currentGalleryFile.getId());
		}
		
		
		
		return 0;
	}
	
	private void deletePhotoData(List<GalleryFile> galleryFileList) {
		
		for(GalleryFile currentGalleryFile : galleryFileList) {
			File deleteFile = new File(baseDir+currentGalleryFile.getFileName());
			
			if(deleteFile.exists()) {
				deleteFile.delete(); 
				System.out.println("파일을 삭제하였습니다.");
			} else {
				System.out.println("파일이 존재하지 않습니다.");
			}
		}

	}
}