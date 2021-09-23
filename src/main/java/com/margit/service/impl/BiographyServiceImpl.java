package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.BiographyCategoryDao;
import com.margit.dao.BiographyDao;
import com.margit.model.Biography;
import com.margit.model.BiographyCategory;
import com.margit.model.BiographyData;
import com.margit.service.BiographyService;

@Service
public class BiographyServiceImpl implements BiographyService{

	
	@Autowired
	private BiographyCategoryDao biographyCategoryDao;
	
	@Autowired
	private BiographyDao biographyDao;
	
	public List<BiographyData> getBiography() {
		List<BiographyData> biographyDataList = new ArrayList<BiographyData>();
		
		List<BiographyCategory> biographyCategory = biographyCategoryDao.findAll();
		
		for(BiographyCategory category: biographyCategory) {
			
			List<Biography> biography = biographyDao.findByBiographycategory_id(category.getId());
			for(Biography _biography: biography) {
				BiographyData biographyData = new BiographyData();
				
				biographyData.setId(_biography.getId());
				biographyData.setStart_year(_biography.getStart_year());
				biographyData.setEnd_year(_biography.getEnd_year());
				biographyData.setBiography_text(_biography.getBiography_text());
				biographyData.setBiography_category(category.getBiography_category());
				biographyData.setBiography_category_id(category.getId());
				
				biographyDataList.add(biographyData);
			}
		}
		
		return biographyDataList;
		
	}
}
