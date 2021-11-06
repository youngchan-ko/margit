package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.margit.model.TextImgFile;

public interface TextImgFileDao extends JpaRepository<TextImgFile,Integer>{

}
