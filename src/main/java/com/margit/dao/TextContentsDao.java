package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.TextContents;

public interface TextContentsDao extends JpaRepository<TextContents, Integer>{
	@Query(value = "SELECT MAX(orderNo) FROM textContents ", nativeQuery = true)
	Integer getCurrentOderNo();

	@Query(value = "SELECT * FROM textContents ORDER BY orderNo ", nativeQuery = true)
	List<TextContents> getTextContents();

	@Query(value = "SELECT * FROM textContents WHERE id=?1 ", nativeQuery = true)
	TextContents getById(int textContensId);
}
