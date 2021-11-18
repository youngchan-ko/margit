package com.margit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.TextContentsDao;
import com.margit.model.TextContents;
import com.margit.service.TextContentsService;

@Service
public class TextContentsServiceImpl implements TextContentsService{
	@Autowired
	TextContentsDao textContentsDao;
	
	@Override
	public List<TextContents> getTextContents() {
		List<TextContents> textContentsList = textContentsDao.getTextContents();
		return textContentsList;
	}

	@Override
	public TextContents getTextContent(int textContentsId) {
		TextContents textContent = textContentsDao.getById(textContentsId);
		return textContent;
	}

	@Override
	public int deleteText(int textContentsId) {
		int deleteText = textContentsDao.deleteById(textContentsId);
		return deleteText;
	}

}
