package com.example.repository;

import com.example.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Query("select u from User u where lower(u.firstName) = lower(:name) or lower(u.lastName) = lower(:name)")
    List<User> findByName(@Param("name") String name);
}