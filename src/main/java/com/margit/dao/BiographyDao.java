package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.Biography;
import com.margit.model.Gallery;

public interface BiographyDao extends JpaRepository<Biography, Integer>{
	
	@Query(value = "SELECT * FROM biography WHERE biographycategory_id= ?1 ORDER BY start_year DESC", nativeQuery = true)
	List<Biography> findByBiographycategory_id(int categoryId);

	@Query(value = "SELECT * FROM biography WHERE id= ?1", nativeQuery = true)
	Biography getById(int biographyId);
	
	@Modifying
	@Query(value = "DELETE FROM biography WHERE id = ?1", nativeQuery = true)
	void deleteById(int biographyId);
	
	@Query(value = "SELECT COUNT(*) FROM biography WHERE biographycategory_id = ?1", nativeQuery = true)
	int countCategory(int biographyCategoryId);
}
