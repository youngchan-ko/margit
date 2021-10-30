package com.margit.service;

import com.margit.model.Biography;
import com.margit.model.BiographyCategory;
import com.margit.model.BiographyData;

public interface BiographySaveService {

	public Biography saveBiography(BiographyData biographyData);
	
}
