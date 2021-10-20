package com.margit.service;

import java.util.List;

import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;

public interface GalleryUpdateService {
	public List<GalleryGroupNameInterface> getGallerygroupName (String galleryCategory);
	public GalleryModifyData getPhotoDetailData(int galleryId);
}
