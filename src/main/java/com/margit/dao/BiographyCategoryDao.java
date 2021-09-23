package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.margit.model.BiographyCategory;


public interface BiographyCategoryDao extends JpaRepository<BiographyCategory, Integer>{

	
}
