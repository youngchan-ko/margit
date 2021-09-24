package com.margit.service;

import java.util.List;

import com.margit.model.BiographyCategory;
import com.margit.model.BiographyData;

public interface BiographyService {

	public List<BiographyCategory> biographyCategoryList();
	public List<BiographyData> getBiography();
}
