package com.web.movie.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(
    name = "Comment",
    uniqueConstraints = @UniqueConstraint(columnNames = {"USER_ID","MOVIE_ID","COMMENTED_AT"}))
@Data
@Builder
public class Comment {

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy =GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "USER_ID",nullable = false)
    private User user;
    
    @Column(name = "COMMENTED_AT",nullable = false)
    private LocalDateTime commentAt;

    @Column(name = "COMMENT",nullable = false)
    private String comment;

    @Column(name = "MOVIE_ID",nullable = false)
    private Integer movieId;
}
