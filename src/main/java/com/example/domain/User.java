package com.example.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

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

	@ManyToMany
	@JoinTable(
		name="USER_GROUP",
		joinColumns=@JoinColumn(name="USER_ID", referencedColumnName="ID"),
		inverseJoinColumns=@JoinColumn(name="GROUP_ID", referencedColumnName="ID")
	)
	private List<Group> groups;

}
