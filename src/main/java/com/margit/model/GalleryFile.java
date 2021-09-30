package com.margit.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class GalleryFile {

	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String originalFileName;
	private String fileName;
	private String fileType;
	private Timestamp regDate;
	private Timestamp updateDate;
	
}
