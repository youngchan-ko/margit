package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.BiographyCategoryDao;
import com.margit.dao.BiographyDao;
import com.margit.model.Biography;
import com.margit.model.BiographyCategory;
import com.margit.model.BiographyDeleteItem;
import com.margit.service.BiographyUpdateService;

@Service
public class BiographyUpdateServiceImpl implements BiographyUpdateService{

	@Autowired
	BiographyCategoryDao biographyCategoryDao;
	@Autowired
	BiographyDao biographyDao;
	
	@Override
	@Transactional
	public int updateBiographyGroup(String biographyGroupModifyData) throws Throwable {
		List<BiographyCategory> biographyCategoryList = getBiographyCategoryList(biographyGroupModifyData);
		
		for(int i=0; i<biographyCategoryList.size(); i++) {
			int biographyCategoryId = biographyCategoryList.get(i).getId();
			String categoryName = biographyCategoryList.get(i).getBiography_category();
			int categoryTrun = biographyCategoryList.get(i).getTurn();
			
			
			biographyCategoryDao.updateBiographyCategory(categoryName,categoryTrun,biographyCategoryId);
		}
		
		return 0;
	}

	private List<BiographyCategory> getBiographyCategoryList(String biographyGroupModifyData) throws Throwable{
		JSONParser jsonParser = new JSONParser();
		
		List<BiographyCategory> biographyCategoryList = new ArrayList<BiographyCategory>();
		
		JSONArray jsonArray = (JSONArray)jsonParser.parse(biographyGroupModifyData);
		
		for(int i=0; i<jsonArray.size(); i++) {
			BiographyCategory currentBiographyCategoryData = new BiographyCategory();
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			
			int biographyCategoryId = Integer.parseInt(String.valueOf(jsonObject.get("biographyCategoryId")));
			int categoryTrun =Integer.parseInt(String.valueOf(jsonObject.get("categoryTurn")));
			String biographyCategor = String.valueOf(jsonObject.get("biographyCategory"));
			
			currentBiographyCategoryData.setId(biographyCategoryId);
			currentBiographyCategoryData.setTurn(categoryTrun);
			currentBiographyCategoryData.setBiography_category(biographyCategor);
			
			biographyCategoryList.add(currentBiographyCategoryData);
		}
		return biographyCategoryList;
		
	}

	@Override
	public BiographyDeleteItem getBiographyDeleteItem(String biographyCategory) {
		BiographyCategory currentBiographyCategory = biographyCategoryDao.getBiographyCategory(biographyCategory);
		List<Biography> biographyItems = biographyDao.findByBiographycategory_id(currentBiographyCategory.getId());
		
		BiographyDeleteItem biographyDeleteItem = new BiographyDeleteItem();
		
		biographyDeleteItem.setBiographyCategoryId(currentBiographyCategory.getId());
		biographyDeleteItem.setBiographyCategory(currentBiographyCategory.getBiography_category());
		biographyDeleteItem.setCategoryTurn(currentBiographyCategory.getTurn());
		biographyDeleteItem.setBiography(biographyItems);
		
		return biographyDeleteItem;
	}
}
