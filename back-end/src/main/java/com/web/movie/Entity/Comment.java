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

@Entity
@Table(
    name = "Comment",
    uniqueConstraints = @UniqueConstraint(columnNames = {"USER_ID","MOVIE_ID","COMMENTED_AT"}))
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

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public LocalDateTime getCommentedAt() {
        return commentAt;
    }
    public void setCommentedAt(LocalDateTime commentedAt) {
        this.commentAt = commentedAt;
    }
    public Comment() {
    }
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
