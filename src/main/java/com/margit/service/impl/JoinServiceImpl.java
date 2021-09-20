package com.margit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.margit.dao.JoinDao;
import com.margit.model.User;
import com.margit.service.JoinService;

@Service
public class JoinServiceImpl implements JoinService{

	@Autowired
	private JoinDao joinDao;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public String joinMember(User user) {
		user.setRole("OWNER");
		String rawPassword = user.getPassword();
		String encPassword = bCryptPasswordEncoder.encode(rawPassword);
		user.setPassword(encPassword);
		joinDao.save(user);
		return "redirect:/loginForm";
	}

}
