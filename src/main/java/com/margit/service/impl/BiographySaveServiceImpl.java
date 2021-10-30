package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.BiographyCategoryDao;
import com.margit.dao.BiographyDao;
import com.margit.model.Biography;
import com.margit.model.BiographyCategory;
import com.margit.model.BiographyData;
import com.margit.service.BiographySaveService;

@Service
public class BiographySaveServiceImpl implements BiographySaveService{

	
	@Autowired
	private BiographyCategoryDao biographyCategoryDao;
	
	@Autowired
	private BiographyDao biographyDao;

	@Override
	@Transactional
	public Biography saveBiography(BiographyData biographyData) {
		int checkBiographyCategory = biographyCategoryDao.searchBiographyCategory(biographyData.getBiography_category());

		if(checkBiographyCategory == 0) {
			BiographyCategory _biographyCategory = new BiographyCategory();
			
			int currentMaxTurn = biographyCategoryDao.getMaxTurn();
			
			_biographyCategory.setBiography_category(biographyData.getBiography_category());
			_biographyCategory.setTurn(currentMaxTurn+1);
			
			biographyCategoryDao.save(_biographyCategory);
			
		}
		
		BiographyCategory biographyCategory = biographyCategoryDao.getBiographyCategory(biographyData.getBiography_category());
		
		Biography biography = new Biography();
		
		biography.setBiographycategory_id(biographyCategory.getId());
		biography.setStart_year(biographyData.getStart_year());
		biography.setEnd_year(biographyData.getEnd_year());
		biography.setBiography_text(biographyData.getBiography_text());
		
		Biography result = biographyDao.save(biography);
		
		return result;
	}

	
	
	
}
