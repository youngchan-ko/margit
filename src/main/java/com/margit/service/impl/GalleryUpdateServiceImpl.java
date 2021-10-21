package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;
import com.margit.model.GalleryUpdateData;
import com.margit.service.GalleryUpdateService;

@Service
public class GalleryUpdateServiceImpl implements GalleryUpdateService {
	
	@Autowired
	GalleryDao galleryDao;
	@Autowired
	GalleryFileDao galleryFileDao;
	
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "gallery_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
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
	
	@Override
	@Transactional
	public int updatePhotoData(GalleryUpdateData galleryUpdateData) {
		Gallery gallery = galleryDao.getById(galleryUpdateData.getGalleryId());
//		Gallery newGallery = new Gallery();
//		System.out.println("updateSetviceImpl-gallery :"+gallery);
//		newGallery.setId(galleryUpdateData.getGalleryId());
//		newGallery.setPhotoName(galleryUpdateData.getPhotoName());
//		newGallery.setPhotoExpl(galleryUpdateData.getPhotoExpl());
//		newGallery.setGalleryCategory(gallery.getGalleryCategory());
//		newGallery.setGalleryFileId(gallery.getGalleryFileId());
//		newGallery.setGroupName(gallery.getGroupName());
//		newGallery.setGroupOrderNo(gallery.getGroupOrderNo());
//		newGallery.setPhotoOrderNo(gallery.getPhotoOrderNo());
//		
//		System.out.println("updateSetviceImpl-newGallery :"+newGallery);
//		//gallery Update
//		galleryDao.save(newGallery);
		galleryDao.updateById(galleryUpdateData.getPhotoName(), galleryUpdateData.getPhotoExpl(), galleryUpdateData.getGalleryId());
		
		
		
		GalleryFile galleryFile = galleryFileDao.getById(gallery.getGalleryFileId());
		GalleryFile newGalleryFile = new GalleryFile();
		System.out.println("updateSetviceImpl-galleryFile :"+galleryFile);

		deletePhotoData(galleryFile);
		
		String saveFileName = makeFileName(galleryUpdateData);
		
		WriteFile(saveFileName, galleryUpdateData);
		
//		newGalleryFile.setOriginalFileName(galleryUpdateData.getImgFile().getOriginalFilename());
//		newGalleryFile.setFileName(savedDir + File.separator + saveFileName);
//		newGalleryFile.setFileType(galleryUpdateData.getImgFile().getContentType());
//		newGalleryFile.setUpdateDate(now);
//		newGalleryFile.setId(galleryFile.getId());
//		newGalleryFile.setRegDate(galleryFile.getRegDate());
//		
//		System.out.println("updateSetviceImpl-newGalleryFile :"+newGalleryFile);
//		//galleryFile Update
//		galleryFileDao.save(newGalleryFile);
		updateGalleryFile(galleryUpdateData, saveFileName, gallery.getGalleryFileId());
		return 1;
		
	}

	
	private void deletePhotoData(GalleryFile galleryFile) {
		
		
			File deleteFile = new File(baseDir+galleryFile.getFileName());
			
			if(deleteFile.exists()) {
				deleteFile.delete(); 
				System.out.println("파일을 삭제하였습니다.");
			} else {
				System.out.println("파일이 존재하지 않습니다.");
			}
	}
	
	//파일 쓰기
	private void WriteFile(String saveFileName, GalleryUpdateData galleryUpdateData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // 저장 디렉토리 확인
			f.mkdirs(); // 해당 디렉토리 만들기
		}
		try(
                FileOutputStream fos = new FileOutputStream(formattedDir + File.separator + saveFileName);
                InputStream is = galleryUpdateData.getImgFile().getInputStream();
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
	private void updateGalleryFile(GalleryUpdateData galleryUpdateData, String saveFileName,int id) {
		
		
		GalleryFile galleryFile = new GalleryFile();
		
		galleryFile.setOriginalFileName(galleryUpdateData.getImgFile().getOriginalFilename());
		galleryFile.setFileName(savedDir + File.separator + saveFileName);
		galleryFile.setFileType(galleryUpdateData.getImgFile().getContentType());
		galleryFile.setRegDate(now);
		galleryFile.setUpdateDate(now);
		
		galleryFileDao.updateById(galleryUpdateData.getImgFile().getOriginalFilename(), 
				savedDir + File.separator + saveFileName, 
				galleryUpdateData.getImgFile().getContentType(), 
				now, 
				id);
		//여기에 gallerFile 업데이트 구문 넣어주기
		//galleryFileDao.save(galleryFile);
	}
	
	//이미지파일 이름 새로 만들기
	private String makeFileName(GalleryUpdateData galleryUpdateData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+galleryUpdateData.getImgFile().getOriginalFilename();
		return saveFilename;
	}
}
