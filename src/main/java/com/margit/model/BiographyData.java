package com.margit.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BiographyData {
	
	private int id;
	private int biography_category_id;
	private String biography_category;
	private String start_year;
	private String end_year;
	private String biography_text;
}
