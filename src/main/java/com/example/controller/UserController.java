package com.example.controller;

import java.com.example.domain.QUser;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.User;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Transactional
public class UserController {
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@RequestMapping(value="/users")
	public List<Tuple> listUsers() {
		QUser user = QUser.user; 
		JPQLQuery<Tuple> query = new JPAQuery<Tuple>(entityManager);
		List<Tuple> users = 
				query.select(user.id, user.userName, user.firstName, user.lastName, user.birthday)
								.from(user)
								.fetch();
//		JPAQueryFactory query = new JPAQueryFactory(entityManager);
//		Query jpaQuery = query.selectFrom(user.getClass()).createQuery();
//		List<User> users = query.selectFrom(user);
//		String jpql = "select u from User as u";
//		TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
//		
//		List<User> users = query.getResultList();
		log.info(String.format("found %d users", users.size()));
		
		return users;
	}
	
	@RequestMapping(value="/user/{id}")
	public User getUserById(@PathVariable Long id) {
		log.info(String.format("id = %s", id));
		String jpql = "select u from User as u where u.id = :id";
		TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
		query.setParameter("id", id);
		
		User user = query.getSingleResult();
		log.info(String.format("found user: %s", user.toString()));
		
		return user;
	}
	
}
