package com.margit.service;

import java.util.List;

import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryModifyData;
import com.margit.model.GalleryUpdateData;

public interface GalleryUpdateService {
	public List<GalleryGroupNameInterface> getGallerygroupName (String galleryCategory);
	public GalleryModifyData getPhotoDetailData(int galleryId);
	public int updatePhotoData(GalleryUpdateData galleryUpdateData);
	public int updatePhotoOrderNo(String photoOrderNoModifyData) throws Throwable;
	public int updateGroupOrderNo(String groupOrderNoModifyData) throws Throwable;
}
