package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.margit.model.Exhibition;

public interface ExhibitionDao extends JpaRepository<Exhibition, Integer>{

}
