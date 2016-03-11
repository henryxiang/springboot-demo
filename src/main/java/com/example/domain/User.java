package com.example.domain;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class User implements Serializable {

	private static final long serialVersionUID = 5805919111088399825L;
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String userName;
	private String firstName;
	private String lastName;
	private Date birthday;

}
