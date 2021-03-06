package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.GalleryDao;
import com.margit.dao.GalleryFileDao;
import com.margit.model.Gallery;
import com.margit.model.GalleryFile;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;
import com.margit.model.GalleryUpdateData;
import com.margit.model.GroupOrderNoModifyData;
import com.margit.model.PhotoOrderNoModifyData;
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
		
		GalleryFile galleryFile = galleryFileDao.getById(gallery.getGalleryFileId());
		
		GalleryModifyData galleryModifyData = new GalleryModifyData();
		galleryModifyData.setGallery(gallery);
		galleryModifyData.setGalleryFile(galleryFile);

		return galleryModifyData;
	}
	
	@Override
	@Transactional
	public int updatePhotoData(GalleryUpdateData galleryUpdateData) {
		Gallery gallery = galleryDao.getById(galleryUpdateData.getGalleryId());
		
		Gallery newGallery = new Gallery();
		newGallery.setId(galleryUpdateData.getGalleryId());
		newGallery.setPhotoName(galleryUpdateData.getPhotoName());
		newGallery.setPhotoExpl(galleryUpdateData.getPhotoExpl());
		newGallery.setGalleryCategory(gallery.getGalleryCategory());
		newGallery.setGalleryFileId(gallery.getGalleryFileId());
		newGallery.setGroupName(gallery.getGroupName());
		newGallery.setGroupOrderNo(gallery.getGroupOrderNo());
		newGallery.setPhotoOrderNo(gallery.getPhotoOrderNo());
		
		//gallery Update
		galleryDao.save(newGallery);
		
		GalleryFile galleryFile = galleryFileDao.getById(gallery.getGalleryFileId());
		GalleryFile newGalleryFile = new GalleryFile();

		deletePhotoData(galleryFile);
		
		String saveFileName = makeFileName(galleryUpdateData);
		
		WriteFile(saveFileName, galleryUpdateData);
		
		newGalleryFile.setOriginalFileName(galleryUpdateData.getImgFile().getOriginalFilename());
		newGalleryFile.setFileName(savedDir + File.separator + saveFileName);
		newGalleryFile.setFileType(galleryUpdateData.getImgFile().getContentType());
		newGalleryFile.setUpdateDate(now);
		newGalleryFile.setId(galleryFile.getId());
		newGalleryFile.setRegDate(galleryFile.getRegDate());
		
		//galleryFile Update
		galleryFileDao.save(newGalleryFile);

		return 1;
	}

	
	private void deletePhotoData(GalleryFile galleryFile) {
		
		
			File deleteFile = new File(baseDir+galleryFile.getFileName());
			
			if(deleteFile.exists()) {
				deleteFile.delete(); 
				System.out.println("????????? ?????????????????????.");
			} else {
				System.out.println("????????? ???????????? ????????????.");
			}
	}
	
	//?????? ??????
	private void WriteFile(String saveFileName, GalleryUpdateData galleryUpdateData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // ?????? ???????????? ??????
			f.mkdirs(); // ?????? ???????????? ?????????
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
	
	//??????????????? ?????? ?????? ?????????
	private String makeFileName(GalleryUpdateData galleryUpdateData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+galleryUpdateData.getImgFile().getOriginalFilename();
		return saveFilename;
	}

	@Override
	@Transactional
	public int updatePhotoOrderNo(String photoOrderNoModifyData) throws Throwable {
		List<PhotoOrderNoModifyData> photoOrderNoModifyDataList = getPhotoOrderNoList(photoOrderNoModifyData);
		for(int i=0; i<photoOrderNoModifyDataList.size(); i++) {
			int photoOrderNo = photoOrderNoModifyDataList.get(i).getPhotoOrderNo();
			int galleryId = photoOrderNoModifyDataList.get(i).getGalleryId();
			
			galleryDao.updatePhotoOrderNo(photoOrderNo,galleryId);
		}
		
		return 1;
	}
	
	private List<PhotoOrderNoModifyData> getPhotoOrderNoList(String photoOrderNoModifyData) throws Throwable {
		JSONParser jsonParser = new JSONParser();
	
		List<PhotoOrderNoModifyData> photoOrderNoModifyDataList = new ArrayList<PhotoOrderNoModifyData>();
		JSONArray jsonArray = (JSONArray)jsonParser.parse(photoOrderNoModifyData);
		for(int i=0; i<jsonArray.size(); i++) {
			PhotoOrderNoModifyData currentPhotoOrderNoModifyData = new PhotoOrderNoModifyData();
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			int galleryId = Integer.parseInt(String.valueOf(jsonObject.get("galleryId")));
			int photoOrderNo =Integer.parseInt(String.valueOf(jsonObject.get("photoOrderNo")));
			currentPhotoOrderNoModifyData.setGalleryId(galleryId);
			currentPhotoOrderNoModifyData.setPhotoOrderNo(photoOrderNo);
			
			photoOrderNoModifyDataList.add(currentPhotoOrderNoModifyData);
		}
		return photoOrderNoModifyDataList;
	}

	@Override
	@Transactional
	public int updateGroupOrderNo(String groupOrderNoModifyData)  throws Throwable {
		List<GroupOrderNoModifyData> groupOrderNoModifyDataList = getGroupOrderNoModifyDataList(groupOrderNoModifyData);
		
		for(int i=0; i<groupOrderNoModifyDataList.size(); i++) {
			String galleryCategory = groupOrderNoModifyDataList.get(i).getGalleryCategory();
			String groupName = groupOrderNoModifyDataList.get(i).getGroupName();
			String newGroupName = groupOrderNoModifyDataList.get(i).getNewGroupName();
			int groupOrderNo = groupOrderNoModifyDataList.get(i).getGroupOrderNo();
			
			galleryDao.updateGroupOrderNo(groupOrderNo, groupName);
			
			if(newGroupName.length() != 0) {
				galleryDao.updateGalleryGroupName(newGroupName, galleryCategory, groupName);
			}
		}
		
		return 1;
	}
	
	private List<GroupOrderNoModifyData> getGroupOrderNoModifyDataList(String groupOrderNoModifyData) throws Throwable{
		JSONParser jsonParser = new JSONParser();
		
		List<GroupOrderNoModifyData> groupOrderNoModifyDataList = new ArrayList<GroupOrderNoModifyData>();
		JSONArray jsonArray = (JSONArray)jsonParser.parse(groupOrderNoModifyData);
		for(int i=0; i<jsonArray.size(); i++) {
			GroupOrderNoModifyData currentGroupOrderNoModifyData = new GroupOrderNoModifyData();
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			String galleryCategory = (String) jsonObject.get("galleryCategory");
			String groupName = (String) jsonObject.get("groupName");
			String newGroupName = (String) jsonObject.get("newGroupName");
			int groupOrderNo =Integer.parseInt(String.valueOf(jsonObject.get("groupOrderNo")));
			currentGroupOrderNoModifyData.setGalleryCategory(galleryCategory);
			currentGroupOrderNoModifyData.setGroupName(groupName);
			currentGroupOrderNoModifyData.setNewGroupName(newGroupName);
			currentGroupOrderNoModifyData.setGroupOrderNo(groupOrderNo);
			
			groupOrderNoModifyDataList.add(currentGroupOrderNoModifyData);
		}
		
		return groupOrderNoModifyDataList;
		
	}
	
}
