package com.margit.service;

import java.util.List;

import com.margit.model.TextContents;

public interface TextContentsService {
	public List<TextContents> getTextContents();
	public TextContents getTextContent(int textContentsId);
}
