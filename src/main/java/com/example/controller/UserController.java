package com.example.controller;

import com.example.domain.QUser;
import com.example.domain.User;
import com.querydsl.jpa.impl.JPAQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@Transactional
public class UserController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

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

	@RequestMapping(path="/user/new", method= RequestMethod.POST)
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
