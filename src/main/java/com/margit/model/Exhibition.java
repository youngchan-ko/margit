package com.margit.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Exhibition {

	@Id //primary key
	private int id;
	private int galleryFileId;
	private String exhibitionTitle;
	private String exhibitionDate;
	private String exhibitionPlace;
	private String exhibitionLink;
}
