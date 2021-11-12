package com.margit.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.margit.dao.TextImgFileDao;
import com.margit.model.TextImgFile;
import com.margit.model.TextImgSaveData;
import com.margit.service.TextImgSaveService;

@Service
public class TextImgSaveServiceImpl implements TextImgSaveService{
	
	@Autowired
	TextImgFileDao textImgFileDao;
	
	private String baseDir = File.separator + "margit_imgs" + File.separator;
	private String savedDir = "text_img" + File.separator + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
	private String formattedDir = baseDir + savedDir;
	private SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	private Date time = new Date();
	private String now = dateFormat.format(time);
	
	@Override
	@Transactional
	public String saveTextImgFile(MultipartFile textImgSaveData) {
		String saveFileName = makeFileName(textImgSaveData);
		TextImgFile TextImgFile = saveTextImgFile(textImgSaveData, saveFileName);
		
//		반환하는 형식은
//		{
//		"uploaded" : 0 ,
//		"filename" : "aaaa.jpg" ,
//		"url" : "/file/aaaa/jpg"
//		"error" : { "message":"업로드가 성공적으로 이루어졌습니다." , "file" : "~~~                   }             
//		}
//		uploaded 가 0 이면 실패 , 1:이면 성공
//		filename , url  까지는 기본으로 넣어주야 하고 나머지는 json 형식에 맞추어서 넣어줍니다.
		String returnString = "{uploaded : 1, "
				+ "filename : "+TextImgFile.getOriginalFileName()+", "
				+ "url : /downloadTextImgFile/"+TextImgFile.getId()+"}";
		
		//파일 쓰기
		WriteFile(saveFileName, textImgSaveData);
		System.out.println(returnString);
		return returnString;
		
	}
	
	//파일 쓰기
	private void WriteFile(String saveFileName, MultipartFile textImgSaveData) {
		File f = new File(formattedDir);
		if(!f.exists()){ // 저장 디렉토리 확인
			f.mkdirs(); // 해당 디렉토리 만들기
		}
		try(
                FileOutputStream fos = new FileOutputStream(formattedDir + File.separator + saveFileName);
                InputStream is = textImgSaveData.getInputStream();
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
	private TextImgFile saveTextImgFile(MultipartFile textImgSaveData, String saveFileName) {
		
		
		TextImgFile textImgFile = new TextImgFile();
		
		textImgFile.setOriginalFileName(textImgSaveData.getOriginalFilename());
		textImgFile.setFileName(savedDir + File.separator + saveFileName);
		textImgFile.setFileType(textImgSaveData.getContentType());
		textImgFile.setRegDate(now);
		textImgFile.setUpdateDate(now);
		
		TextImgFile resultTextImgFile = textImgFileDao.save(textImgFile);
		
		return resultTextImgFile;
	}
	
	//이미지파일 이름 새로 만들기
	private String makeFileName(MultipartFile textImgSaveData) {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String saveFilename = dateStr+textImgSaveData.getOriginalFilename();
		return saveFilename;
	}
}
