package com.margit.service;

import java.util.List;

import com.margit.model.Gallery;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryViewData;
import com.margit.model.PhotoData;

public interface GalleryService {

	public List<GalleryViewData> getGalleryViewData (String galleryCategory);

	public List<Gallery> getGroupPhotoData(String galleryCategory, String groupName);
}
