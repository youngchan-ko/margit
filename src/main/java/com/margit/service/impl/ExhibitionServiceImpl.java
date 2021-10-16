package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.ExhibitionDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Exhibition;
import com.margit.model.ExhibitionSaveData;
import com.margit.model.GalleryFile;
import com.margit.service.ExhibitionService;

@Service
public class ExhibitionServiceImpl implements ExhibitionService {

	@Autowired
	GalleryFileDao galleryFileDao;
	@Autowired
	ExhibitionDao exhibitionDao;
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "gallery_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
	@Override
	@Transactional
	public void saveExhibition(ExhibitionSaveData exhibitionSaveData) {
		String exhibitionFileName = makeFileName(exhibitionSaveData);
		GalleryFile saveGalleryFileResultModel = saveGalleryFile(exhibitionSaveData, exhibitionFileName);
	
		WriteFile(exhibitionFileName, exhibitionSaveData);
		
		Exhibition exhibition = new Exhibition();
		
		exhibition.setGalleryFileId(saveGalleryFileResultModel.getId());
		exhibition.setExhibitionTitle(exhibitionSaveData.getExhibitionTitle());
		exhibition.setExhibitionPlace(exhibitionSaveData.getExhibitionPlace());
		exhibition.setExhibitionLink(exhibitionSaveData.getExhibitionLink());
		exhibition.setExhibitionDate(exhibitionSaveData.getExhibitionDate());
		
		exhibitionDao.save(exhibition);
		
	}
	
	//파일 쓰기
	private void WriteFile(String saveFileName, ExhibitionSaveData exhibitionSaveData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // 저장 디렉토리 확인
			f.mkdirs(); // 해당 디렉토리 만들기
		}
		try(
                FileOutputStream fos = new FileOutputStream(formattedDir + File.separator + saveFileName);
                InputStream is = exhibitionSaveData.getImgFile().getInputStream();
        ){
        	    int readCount = 0;
        	    byte[] buffer = new byte[1024];
            while((readCount = is.read(buffer)) != -1){
                fos.write(buffer,0,readCount);
            }
        }catch(Exception ex){
            throw new RuntimeException("file Save Error");
        }
	}
	
	//GalleryFile테이블 저장
	private GalleryFile saveGalleryFile(ExhibitionSaveData exhibitionSaveData, String saveFileName) {
		
		
		GalleryFile galleryFile = new GalleryFile();
		
		galleryFile.setOriginalFileName(exhibitionSaveData.getImgFile().getOriginalFilename());
		galleryFile.setFileName(savedDir + File.separator + saveFileName);
		galleryFile.setFileType(exhibitionSaveData.getImgFile().getContentType());
		galleryFile.setRegDate(now);
		galleryFile.setUpdateDate(now);
		
		galleryFileDao.save(galleryFile);
		GalleryFile saveGalleryFileResultModel = galleryFileDao.findByFileName(savedDir + File.separator + saveFileName);
		return saveGalleryFileResultModel;
	}
	
	//이미지파일 이름 새로 만들기
	private String makeFileName(ExhibitionSaveData exhibitionSaveData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+exhibitionSaveData.getImgFile().getOriginalFilename();
		return saveFilename;
	}
}
