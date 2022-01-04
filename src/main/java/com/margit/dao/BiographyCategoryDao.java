package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.BiographyCategory;


public interface BiographyCategoryDao extends JpaRepository<BiographyCategory, Integer>{
	@Query(value = "SELECT * FROM BiographyCategory ORDER BY turn", 
			nativeQuery = true)
	List<BiographyCategory> getBiographyCategoryList();
	
	@Query(value = "select EXISTS (select * from BiographyCategory where biography_category= ?1 limit 1) as success;", 
			nativeQuery = true)
	int searchBiographyCategory(String biographyCategory);
	
	@Query(value = "SELECT MAX(turn) FROM BiographyCategory;", 
			nativeQuery = true)
	Integer getMaxTurn();

	@Query(value = "SELECT * FROM BiographyCategory WHERE biography_category = ?1", 
			nativeQuery = true)
	BiographyCategory getBiographyCategory(String biographyCategory);
	
	@Modifying
	@Query(value = "UPDATE BiographyCategory SET biography_category = ?1, turn = ?2 WHERE id= ?3", nativeQuery = true)
	void updateBiographyCategory(String categoryName, int turn, int id);
	
	@Modifying
	@Query(value = "DELETE FROM BiographyCategory WHERE id = ?1", nativeQuery = true)
	void deleteById(int biographyCategoryId);
	
}
