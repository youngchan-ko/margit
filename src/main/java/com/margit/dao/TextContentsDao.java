package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.TextContents;

public interface TextContentsDao extends JpaRepository<TextContents, Integer>{
	@Query(value = "SELECT MAX(orderNo) FROM textContents ", nativeQuery = true)
	Integer getCurrentOderNo();
}
