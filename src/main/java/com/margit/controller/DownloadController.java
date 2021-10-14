package com.margit.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.margit.model.GalleryFile;
import com.margit.service.DownloadService;


@Controller
public class DownloadController {

	private String basePath = File.separator + "margit_imgs" + File.separator;
	@Autowired
	DownloadService downloadService;
	
	@GetMapping("/download/{galleryFileId}")
	public void download(HttpServletResponse response, 
			@PathVariable("galleryFileId") int galleryFileId) {
		
		GalleryFile galleryFile = downloadService.getGalleryFile(galleryFileId);
        
		String fileName = galleryFile.getFileName();
		String saveFileName = basePath + galleryFile.getFileName();
		String contentType = galleryFile.getFileType();
		long fileLength = new File(saveFileName).length();
		
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setHeader("Content-Type", contentType);
        response.setHeader("Content-Length", "" + fileLength);
        response.setHeader("Pragma", "no-cache;");
        response.setHeader("Expires", "-1;");
        
        try(
                FileInputStream fis = new FileInputStream(saveFileName);
                OutputStream out = response.getOutputStream();
        ){
        	    int readCount = 0;
        	    byte[] buffer = new byte[1024];
            while((readCount = fis.read(buffer)) != -1){
            		out.write(buffer,0,readCount);
            }
        }catch(Exception ex){
            throw new RuntimeException("file Save Error");
        }
	}
}
