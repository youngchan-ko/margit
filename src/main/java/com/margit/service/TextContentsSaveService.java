package com.margit.service;

import com.margit.model.TextContents;
import com.margit.model.TextContentsData;

public interface TextContentsSaveService {
	public TextContents saveText(TextContentsData textContentsData);
}
