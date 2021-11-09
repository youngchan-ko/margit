package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.TextContentsDao;
import com.margit.dao.TextImgFileDao;
import com.margit.model.TextContents;
import com.margit.model.TextContentsData;
import com.margit.model.TextImgFile;
import com.margit.model.TextImgSaveData;
import com.margit.service.TextContentsService;

@Service
public class TextContentsServiceImpl implements TextContentsService{
	@Autowired
	TextImgFileDao textImgFileDao;
	@Autowired
	TextContentsDao textContentsDao;
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "text_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
	@Override
	@Transactional
	public TextContents saveText(TextContentsData textContentsData) {
		TextContents textContents = new TextContents();
		
		if(textContentsData.getTitleImgFile() != null) {
			String saveFileName = makeFileName(textContentsData);
			TextImgFile TextImgFile = saveTextImgFile(textContentsData, saveFileName);
			
			//파일 쓰기
			WriteFile(saveFileName, textContentsData);
			textContents.setTitlePhotoId(TextImgFile.getId());
		}
		
		Integer orderNo = textContentsDao.getCurrentOderNo();
		if(orderNo == null) {
			orderNo = 1;
		}else {
			orderNo++;
		}
		
		textContents.setTitle(textContentsData.getTitle());
		textContents.setContentText(textContentsData.getTextContent());
		textContents.setOrderNo(orderNo);
		
		TextContents currentTextContents = textContentsDao.save(textContents);
		
		return currentTextContents;
	}
	
	//파일 쓰기
	private void WriteFile(String saveFileName, TextContentsData textContentsData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // 저장 디렉토리 확인
			f.mkdirs(); // 해당 디렉토리 만들기
		}
		try(
                FileOutputStream fos = new FileOutputStream(formattedDir + File.separator + saveFileName);
                InputStream is = textContentsData.getTitleImgFile().getInputStream();
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
	
	//TextImgFile테이블 저장
	private TextImgFile saveTextImgFile(TextContentsData textContentsData, String saveFileName) {
		
		
		TextImgFile textImgFile = new TextImgFile();
		
		textImgFile.setOriginalFileName(textContentsData.getTitleImgFile().getOriginalFilename());
		textImgFile.setFileName(savedDir + File.separator + saveFileName);
		textImgFile.setFileType(textContentsData.getTitleImgFile().getContentType());
		textImgFile.setRegDate(now);
		textImgFile.setUpdateDate(now);
		
		TextImgFile resultTextImgFile = textImgFileDao.save(textImgFile);
		
		return resultTextImgFile;
	}
	
	//이미지파일 이름 새로 만들기
	private String makeFileName(TextContentsData textContentsData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+textContentsData.getTitleImgFile().getOriginalFilename();
		return saveFilename;
	}

}
