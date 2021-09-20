package com.margit.service.impl;

import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.margit.dao.ContactDao;
import com.margit.model.Contact;
import com.margit.service.ContactService;

@Service
public class ContactServiceImpl implements ContactService{

	@Autowired
	private ContactDao contactDao;
	
	@Override
	public Contact getContact() {
		Contact contactData = contactDao.findById(ContactService.CONTACTID).orElseGet(new Supplier<Contact>() {

			@Override
			public Contact get() {
				return new Contact();
			}
		
		});
		return contactData;
	}

}
