package com.web.movie.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "[User]")
@Data
public class User {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "USERNAME",nullable = false, unique = true)
    private String username;

    @Column(name = "PASSWORD",nullable = false)
    private String password;

    @Column(name = "ROLE",nullable = false)
    private String role;

    @Column(name = "EMAIL",nullable = false,unique = true)
    private String email;
}
