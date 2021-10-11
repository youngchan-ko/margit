package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.Gallery;
import com.margit.model.GalleryGroupNameInterface;

//JpaRepository<User(데이터 타입), Integer(프라이머리키의 형태)>
public interface GalleryDao extends JpaRepository<Gallery, Integer>{

	@Query(value = "SELECT MAX(photoOrderNo) FROM gallery "
			+ "WHERE galleryCategory = ?1 AND groupName = ?2", 
			nativeQuery = true)
	Integer getCurrentPhotoOderNo(String galleryCategory, String group);
	
	@Query(value = "select EXISTS (select * from gallery where groupName=?1 limit 1) as success;", 
			nativeQuery = true)
	int searchGalleryGroupName(String galleryCategory);

	@Query(value = "SELECT DISTINCT groupOrderNo FROM gallery "
			+ "WHERE galleryCategory= ?1 AND groupName=?2", 
			nativeQuery = true)
	Integer getCurrentGroupOderNo(String galleryCategory, String group);
	
	@Query(value = "SELECT MAX(groupOrderNo) FROM gallery WHERE galleryCategory = ?1", 
			nativeQuery = true)
	Integer getMaxGroupOderNo(String galleryCategory);

	@Query(value = "select DISTINCT groupName, groupOrderNo from gallery "
			+ "where galleryCategory=?1 ORDER BY groupOrderNo", 
			nativeQuery = true)
	List<GalleryGroupNameInterface> getGroupName(String galleryCategory);

	@Query(value = "SELECT * FROM gallery WHERE groupName = ?1 ORDER BY photoOrderNo", 
			nativeQuery = true)
	List<Gallery> getGroupPhotoData(String groupName);
	
}
