package com.margit.service;

import com.margit.model.BiographyDeleteItem;

public interface BiographyUpdateService {
	
	public int updateBiographyGroup(String biographyGroupModifyData) throws Throwable;
	public BiographyDeleteItem getBiographyDeleteItem(String biographyCategory);
	
}
