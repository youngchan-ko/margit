package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
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
	public void saveGallery(GallerySaveData gallerySaveData) {
		GalleryFile saveGalleryFileResultModel = saveGalleryFile(gallerySaveData);
		Integer currentPhotoOrderNo = getCrrentPhotoOrderNo(gallerySaveData);
		Integer currentGroupOrderNo = getCurrentGroupOrderNo(gallerySaveData);
		
		//파일 쓰기
		WriteFile(saveGalleryFileResultModel, gallerySaveData);
		
		Gallery gallery = new Gallery();
		gallery.setGalleryFileId(saveGalleryFileResultModel.getId());
		gallery.setGalleryCategory(gallerySaveData.getGalleryCategory());
		gallery.setPhotoName(gallerySaveData.getPhotoName());
		gallery.setPhotoExpl(gallerySaveData.getPhotoExpl());
		gallery.setPhotoOrderNo(currentPhotoOrderNo);
		gallery.setGroupName(gallerySaveData.getGroupName());
		gallery.setGroupOrderNo(currentGroupOrderNo);
		
		galleryDao.save(gallery);
	}
	
	//파일 쓰기
	private void WriteFile(GalleryFile galleryFile, GallerySaveData gallerySaveData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // 저장 디렉토리 확인
			f.mkdirs(); // 해당 디렉토리 만들기
		}
		try(
                FileOutputStream fos = new FileOutputStream(formattedDir + File.separator + galleryFile.getFileName());
                InputStream is = gallerySaveData.getImgFile().getInputStream();
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
	
	//CrrentGroupOrderNo Gallery테이블에서 확인해서 그 다음 번호로 넣어주기
	private Integer getCurrentGroupOrderNo(GallerySaveData gallerySaveData) {
		int searchingGroupName = galleryDao.searchGalleryGroupName(gallerySaveData.getGroupName());
		int currentGroupOrderNo = 0;
		if(searchingGroupName == 1) {
			currentGroupOrderNo = galleryDao.getCurrentGroupOderNo(
					gallerySaveData.getGalleryCategory(), gallerySaveData.getGroupName());
			
			System.out.println("currentGroupOrderNo(oben) : "+currentGroupOrderNo);
		}else {
			System.out.println("currentGroupOrderNo(unten) : "+currentGroupOrderNo);
			Integer nextGroupOrderNo = galleryDao.getMaxGroupOderNo(gallerySaveData.getGalleryCategory());
			if(nextGroupOrderNo == null) {
				nextGroupOrderNo = 0;
			}
			currentGroupOrderNo = nextGroupOrderNo+1;		
			
		}
		return currentGroupOrderNo;
	}
	
	
	//CrrentPhotoOrderNo Gallery테이블에서 확인해서 그 다음 번호로 넣어주기
	private Integer getCrrentPhotoOrderNo(GallerySaveData gallerySaveData) {
		Integer currentPhotoOrderNo = galleryDao.getCurrentPhotoOderNo(
				gallerySaveData.getGalleryCategory(), gallerySaveData.getGroupName());
		if(currentPhotoOrderNo == null) {
			currentPhotoOrderNo = 1;
		}else {
			currentPhotoOrderNo++;
		}
		return currentPhotoOrderNo;
	}
	
	//GalleryFile테이블 저장
	private GalleryFile saveGalleryFile(GallerySaveData gallerySaveData) {
		String saveFileName = makeFileName(gallerySaveData);
		
		GalleryFile galleryFile = new GalleryFile();
		
		galleryFile.setOriginalFileName(gallerySaveData.getImgFile().getOriginalFilename());
		galleryFile.setFileName(saveFileName);
		galleryFile.setFileType(gallerySaveData.getImgFile().getContentType());
		galleryFile.setRegDate(now);
		galleryFile.setUpdateDate(now);
		
		galleryFileDao.save(galleryFile);
		GalleryFile saveGalleryFileResultModel = galleryFileDao.findByFileName(saveFileName);
		
		return saveGalleryFileResultModel;
	}

	//이미지파일 이름 새로 만들기
	private String makeFileName(GallerySaveData gallerySaveData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+gallerySaveData.getImgFile().getOriginalFilename();
		return saveFilename;
	}

}
