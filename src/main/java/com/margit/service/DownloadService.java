package com.margit.service;

import com.margit.model.GalleryFile;
import com.margit.model.TextImgFile;

public interface DownloadService {
	public GalleryFile getGalleryFile(int galleryFileId);

	public TextImgFile getTextImgFile(int textImgFileId);
}
