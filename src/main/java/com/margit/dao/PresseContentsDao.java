package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.PresseContents;

public interface PresseContentsDao extends JpaRepository<PresseContents, Integer>{
	@Query(value = "SELECT MAX(orderNo) FROM PresseContents ", nativeQuery = true)
	Integer getCurrentOderNo();

	@Query(value = "SELECT * FROM PresseContents ORDER BY orderNo DESC", nativeQuery = true)
	List<PresseContents> getPresseContents();

	@Query(value = "SELECT * FROM PresseContents WHERE id=?1 ", nativeQuery = true)
	PresseContents getById(int textContensId);
	
	@Modifying
	@Query(value = "DELETE FROM PresseContents WHERE id = ?1", nativeQuery = true)
	int deleteById(int presseContensId);

	@Modifying
	@Query(value = "UPDATE PresseContents SET orderNo = ?1 WHERE id = ?2", nativeQuery = true)
	int updateOrderNo(int orderNo, int id);
}
