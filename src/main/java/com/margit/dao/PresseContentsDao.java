package com.margit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.margit.model.PresseContents;

public interface PresseContentsDao extends JpaRepository<PresseContents, Integer>{
	@Query(value = "SELECT MAX(orderNo) FROM presseContents ", nativeQuery = true)
	Integer getCurrentOderNo();

	@Query(value = "SELECT * FROM presseContents ORDER BY orderNo DESC", nativeQuery = true)
	List<PresseContents> getPresseContents();

	@Query(value = "SELECT * FROM presseContents WHERE id=?1 ", nativeQuery = true)
	PresseContents getById(int textContensId);
	
	@Modifying
	@Query(value = "DELETE FROM presseContents WHERE id = ?1", nativeQuery = true)
	int deleteById(int presseContensId);

	@Modifying
	@Query(value = "UPDATE pressecontents SET orderNo = ?1 WHERE id = ?2", nativeQuery = true)
	int updateOrderNo(int orderNo, int id);
}
