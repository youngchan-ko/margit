package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.Gallery;

//JpaRepository<User(데이터 타입), Integer(프라이머리키의 형태)>
public interface GalleryDao extends JpaRepository<Gallery, Integer>{

	@Query(value = "SELECT MAX(photoOrderNo) FROM gallery "
			+ "WHERE galleryCategory = ?1 AND groupName = ?2", 
			nativeQuery = true)
	Integer getCurrentPhotoOderNo(String galleryCategory, String group);
	
	@Query(value = "SELECT DISTINCT groupOrderNo FROM gallery "
			+ "WHERE galleryCategory= ?1 AND groupName=?2", 
			nativeQuery = true)
	Integer getCurrentGroupOderNo(String galleryCategory, String group);

	@Query(value = "SELECT MAX(groupOrderNo) FROM gallery WHERE galleryCategory = ?1", 
			nativeQuery = true)
	int getMaxGroupOderNo(String galleryCategory);
	
}
