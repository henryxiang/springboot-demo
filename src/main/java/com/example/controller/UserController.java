package com.example.controller;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.QUser;
import com.example.domain.User;
import com.querydsl.jpa.impl.JPAQuery;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Transactional
public class UserController {
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@RequestMapping(path="/users")
	public List<User> listUsers() {
		QUser qUser = QUser.user; 
		JPAQuery<User> query = new JPAQuery<User>(entityManager);
		List<User> users = query.from(qUser).fetch();

		log.info(String.format("found %d users", users.size()));
		
		return users;
	}
	
	@RequestMapping(path="/user/{id}")
	public User getUserById(@PathVariable Long id) {
		log.info(String.format("id = %s", id));
		
		QUser qUser = QUser.user; 
		JPAQuery<User> query = new JPAQuery<User>(entityManager);
		User user = query.from(qUser).where(qUser.id.eq(id)).fetchOne();
		if (user != null) {
			log.info(String.format("found user: %s", user.toString()));	
			return user;
		} else {
			log.error(String.format("user with id %d not found", id));
			user = new User();
			return user;
		}
	}
	
	@RequestMapping(path="/user/new", method=RequestMethod.POST)
	public User createUser(@RequestBody User user) {
		entityManager.persist(user);
		log.info(String.format("user saved: %s", user));
		return user;
	}
	
	@RequestMapping(path="/user/update", method=RequestMethod.POST)
	public User updateUser(@RequestBody User user) {
		entityManager.merge(user);
		log.info(String.format("user saved: %s", user));
		return user;
	}
	
}
