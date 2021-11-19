package com.margit.service;

import com.margit.model.Exhibition;
import com.margit.model.ExhibitionSaveData;

public interface ExhibitionService {

	public Exhibition getExhibition();
	public void saveExhibition(ExhibitionSaveData exhibitionSaveData);
	public void deleteExhibition();

}
