package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.TextImgFile;

public interface TextImgFileDao extends JpaRepository<TextImgFile,Integer>{

	@Query(value = "SELECT * FROM TextImgFile WHERE id= ?1", nativeQuery = true)
	TextImgFile findById(int textImgFileId);
}
