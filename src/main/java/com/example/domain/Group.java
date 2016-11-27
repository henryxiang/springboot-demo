package com.example.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by henry on 11/26/16.
 */
@Entity
@Table(name = "GROUPS")
@Data
public class Group implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String groupName;

    @ManyToMany(mappedBy = "groups")
    List<User> users;
}
