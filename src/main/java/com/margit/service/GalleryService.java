package com.margit.service;

import java.util.List;

import com.margit.model.GalleryGroupNameInterface;
import com.margit.model.GalleryViewData;

public interface GalleryService {

	public List<GalleryViewData> getGallerygroupName (String galleryCategory);

}
