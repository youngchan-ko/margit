package com.margit.service;

import java.util.List;

import com.margit.model.PresseContents;

public interface PresseContentsService {
	public List<PresseContents> getPresseContents();
	public PresseContents getPresseContent(int textContentsId);
	public int deletePresse(int presseContentsId);
}
