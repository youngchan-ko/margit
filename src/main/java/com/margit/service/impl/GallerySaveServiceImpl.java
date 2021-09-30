package com.margit.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.margit.model.GallerySaveData;
import com.margit.service.GallerySaveService;


@Service
public class GallerySaveServiceImpl implements GallerySaveService{
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "gallery_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
	@Override
	@Transactional
	public int saveGallery() {
		
		
		return 0;
		
	}
	
	//이미지파일 이름 새로 만들기
	private String makeFileName(GallerySaveData gallerySaveData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+gallerySaveData.getFileName();
		return saveFilename;
}

}
