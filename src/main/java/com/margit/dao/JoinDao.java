package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.margit.model.User;

public interface JoinDao extends JpaRepository<User,Integer> {

}
