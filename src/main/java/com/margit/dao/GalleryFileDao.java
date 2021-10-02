package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.GalleryFile;

//JpaRepository<User(데이터 타입), Integer(프라이머리키의 형태)>
public interface GalleryFileDao extends JpaRepository<GalleryFile, Integer>{

	@Query(value = "SELECT * FROM galleryfile WHERE fileName= ?1", nativeQuery = true)
	GalleryFile findByFileName(String saveFileName);
	
}
