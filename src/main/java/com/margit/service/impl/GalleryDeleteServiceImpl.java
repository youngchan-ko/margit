package com.margit.service.impl;

import java.io.File;
import java.nio.file.Path;

import org.springframework.stereotype.Service;

import com.margit.service.GalleryDeleteService;

@Service
public class GalleryDeleteServiceImpl implements GalleryDeleteService{

	private String baseDir = File.separator + "margit_imgs" + File.separator;
	

	@Override
	public int deleteGalleryFile() {
		File deleteFile = new File(baseDir+"파일이름");
		
		
		if(deleteFile.exists()) {
            deleteFile.delete(); 
            System.out.println("파일을 삭제하였습니다.");
        } else {
            System.out.println("파일이 존재하지 않습니다.");
        }
		return 0;
	}

}