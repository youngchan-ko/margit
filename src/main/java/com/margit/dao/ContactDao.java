package com.margit.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.margit.model.Contact;

//JpaRepository<User(데이터 타입), Integer(프라이머리키의 형태)>
public interface ContactDao extends JpaRepository<Contact, Integer>{
	
}
