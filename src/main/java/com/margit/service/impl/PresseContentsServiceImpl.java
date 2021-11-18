package com.margit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.PresseContentsDao;
import com.margit.model.PresseContents;
import com.margit.service.PresseContentsService;

@Service
public class PresseContentsServiceImpl implements PresseContentsService{
	@Autowired
	PresseContentsDao presseContentsDao;
	
	@Override
	public List<PresseContents> getPresseContents() {
		List<PresseContents> presseContentsList = presseContentsDao.getPresseContents();
		return presseContentsList;
	}

	@Override
	public PresseContents getPresseContent(int textContentsId) {
		PresseContents presseContents = presseContentsDao.getById(textContentsId);
		return presseContents;
	}

	@Override
	public int deletePresse(int presseContentsId) {
		int deletePresse = presseContentsDao.deleteById(presseContentsId);
		return deletePresse;
	}

}
