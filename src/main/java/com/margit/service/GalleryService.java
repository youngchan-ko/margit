package com.margit.service;

import java.util.List;

import com.margit.model.Gallery;
import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.PhotoData;

public interface GalleryService {

	public List<PhotoData> getGalleryPhotoData (String galleryCategory, String groupName);

}
