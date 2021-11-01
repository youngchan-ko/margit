package com.margit.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class BiographyDeleteItem {
	
	private int biographyCategoryId;
	private String biographyCategory;
	private int categoryTurn;
	private List<Biography> biography;
}
