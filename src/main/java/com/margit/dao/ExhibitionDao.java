package com.margit.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.Exhibition;

public interface ExhibitionDao extends JpaRepository<Exhibition, Integer>{
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM exhibition WHERE id = 1", nativeQuery = true)
	void deleteById();
}
