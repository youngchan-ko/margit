package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.BiographyCategory;


public interface BiographyCategoryDao extends JpaRepository<BiographyCategory, Integer>{

	@Query(value = "select EXISTS (select * from biographycategory where biography_category= ?1 limit 1) as success;", 
			nativeQuery = true)
	int searchBiographyCategory(String biographyCategory);
	
	@Query(value = "SELECT MAX(turn) FROM biographycategory;", 
			nativeQuery = true)
	Integer getMaxTurn();

	@Query(value = "SELECT * FROM biographycategory WHERE biography_category = ?1", 
			nativeQuery = true)
	BiographyCategory getBiographyCategory(String biographyCategory);
	
}
