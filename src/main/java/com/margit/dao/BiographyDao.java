package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.Biography;

public interface BiographyDao extends JpaRepository<Biography, Integer>{
	
	@Query(value = "SELECT * FROM biography WHERE biographycategory_id= ?1 ORDER BY start_year DESC", nativeQuery = true)
	List<Biography> findByBiographycategory_id(int categoryId);

}
