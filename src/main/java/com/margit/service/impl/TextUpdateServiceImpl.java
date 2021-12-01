package com.margit.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.TextContentsDao;
import com.margit.model.TextOrderNoModifyData;
import com.margit.service.TextUpdateService;

@Service
public class TextUpdateServiceImpl implements TextUpdateService{
	@Autowired
	TextContentsDao textContentsDao;
	
	@Override
	@Transactional
	public int updatePresseOrderNo(String textContentsData) throws Throwable {
		List<TextOrderNoModifyData> TextOrderNoModifyDataList = getTextOrderNoModifyDataList(textContentsData);
		
		for(int i=0; i<TextOrderNoModifyDataList.size(); i++) {
			int id = TextOrderNoModifyDataList.get(i).getId();
			int orderNo = TextOrderNoModifyDataList.get(i).getOrderNo();
			
			textContentsDao.updateOrderNo(orderNo, id);
		}
		
		return 0;
	}

	private List<TextOrderNoModifyData> getTextOrderNoModifyDataList(String textContentsData) throws Throwable{
		JSONParser jsonParser = new JSONParser();
		
		List<TextOrderNoModifyData> textOrderNoModifyDataList = new ArrayList<TextOrderNoModifyData>();
		JSONArray jsonArray = (JSONArray)jsonParser.parse(textContentsData);
		for(int i=0; i<jsonArray.size(); i++) {
			TextOrderNoModifyData currentTextOrderNoModifyData = new TextOrderNoModifyData();
			JSONObject jsonObject = (JSONObject)jsonArray.get(i);
			int id = Integer.parseInt(String.valueOf(jsonObject.get("id")));
			int groupOrderNo = Integer.parseInt(String.valueOf(jsonObject.get("textOrderNo")));
			currentTextOrderNoModifyData.setId(id);
			currentTextOrderNoModifyData.setOrderNo(groupOrderNo);
			
			textOrderNoModifyDataList.add(currentTextOrderNoModifyData);
		}
		
		return textOrderNoModifyDataList;
		
	}
}
