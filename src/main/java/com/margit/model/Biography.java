package com.margit.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Biography {
	
	private int id;
	private String biography_category;
	private String start_year;
	private String end_year;
	private String biography_text;
}
