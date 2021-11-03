package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.BiographyCategoryDao;
import com.margit.dao.BiographyDao;
import com.margit.model.Biography;
import com.margit.service.BiographyDeleteService;

@Service
public class BiographyDeleteServiceImpl implements BiographyDeleteService{

	@Autowired
	BiographyDao biographyDao;
	@Autowired
	BiographyCategoryDao biographyCategoryDao;
	
	@Override
	@Transactional
	public void deleteBiography(List<Integer> biographyId) {
		
		List<Biography> biographyList = new ArrayList<Biography>();
		
		for(Integer currentbiographyId : biographyId) {
			Biography biography = new Biography();
			biography = biographyDao.getById(currentbiographyId);
			biographyList.add(biography);
		}
		
		int biographyCategoryId = biographyList.get(0).getBiographycategory_id();
		
		for(Biography currentbiography : biographyList) {
			biographyDao.deleteById(currentbiography.getId());
		}
		
		validateBiographyCategory(biographyCategoryId);
	}

	//바이오그라피 삭제후에 그룹멤버가 있는지 확인하고 그룹멤버가 없다면 biographyCategory 삭제하기
	private void validateBiographyCategory(int biographyCategoryId) {
		int categoryItemCount = biographyDao.countCategory(biographyCategoryId);
		if(categoryItemCount == 0) {
			biographyCategoryDao.deleteById(biographyCategoryId);
		}
	}
}
