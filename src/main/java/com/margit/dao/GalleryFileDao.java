package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.GalleryFile;

//JpaRepository<User(데이터 타입), Integer(프라이머리키의 형태)>
public interface GalleryFileDao extends JpaRepository<GalleryFile, Integer>{

	@Query(value = "SELECT * FROM GalleryFile WHERE fileName= ?1", nativeQuery = true)
	GalleryFile findByFileName(String saveFileName);
	
	@Query(value = "SELECT * FROM GalleryFile WHERE id= ?1", nativeQuery = true)
	GalleryFile findById(int galleryFileId);
	
	@Query(value = "select * from GalleryFile order by rand() limit 1;", nativeQuery = true)
	GalleryFile getRandomImg();
	
	@Modifying
	@Query(value = "DELETE FROM GalleryFile WHERE id = ?1", nativeQuery = true)
	void deleteById(int galleryFileId);
	
	@Modifying
	@Query(value = "UPDATE GalleryFile SET originalFileName= ?1, fileName= ?2, "
			+ "fileType= ?3, updateDate = ?4 WHERE id= ?5", nativeQuery = true)
	void updateById(
			String originalFileName, String fileName, String fileType, String updateDate, int id);
}
