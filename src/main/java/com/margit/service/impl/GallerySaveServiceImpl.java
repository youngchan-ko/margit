package com.margit.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GallerySaveData;
import com.margit.service.GallerySaveService;


@Service
public class GallerySaveServiceImpl implements GallerySaveService{
	
	@Autowired
	GalleryFileDao galleryFileDao;
	@Autowired
	GalleryDao galleryDao;
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "gallery_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
	@Override
	@Transactional
	public int saveGallery(GallerySaveData gallerySaveData) {
		int saveGalleryFileId = saveGalleryFile(gallerySaveData);
		int crrentPhotoOrderNo = galleryDao.getCurrentPhotoOderNo(
				gallerySaveData.getGalleryCategory(), gallerySaveData.getGroup());
		
		Gallery gallery = new Gallery();
		gallery.setGalleryFileId(saveGalleryFileId);
		gallery.setGalleryCategory(gallerySaveData.getGalleryCategory());
		gallery.setPhotoName(gallerySaveData.getPhotoName());
		gallery.setPhotoExpl(gallerySaveData.getPhotoExpl());
		gallery.setPhotoOrderNo(crrentPhotoOrderNo);
		gallery.setGroup(gallerySaveData.getGroup());
		
		return 0;
		
		
	}
	
	
	private int saveGalleryFile(GallerySaveData gallerySaveData) {
		String saveFileName = makeFileName(gallerySaveData);
		
		GalleryFile galleryFile = new GalleryFile();
		
		galleryFile.setOriginalFileName(gallerySaveData.getImgFile().getOriginalFilename());
		galleryFile.setFileName(saveFileName);
		galleryFile.setFileType(gallerySaveData.getImgFile().getContentType());
		galleryFile.setRegDate(now);
		galleryFile.setUpdateDate(now);
		
		galleryFileDao.save(galleryFile);
		GalleryFile saveResultModel = galleryFileDao.findByFileName(saveFileName);
		int saveGalleryFileId = saveResultModel.getId();
		return saveGalleryFileId;
	}

	//이미지파일 이름 새로 만들기
	private String makeFileName(GallerySaveData gallerySaveData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+gallerySaveData.getImgFile().getOriginalFilename();
		return saveFilename;
	}

}
