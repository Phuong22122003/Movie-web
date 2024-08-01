package com.web.movie.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "COMMENT")
@IdClass(CommentKey.class)
public class Comment {
    @Id
    @Column(name = "USERNAME")
    private String username;

    @Id
    @Column(name = "MOVIE_ID")
    private Integer movieId;

    @Id
    @Column(name = "COMMENT_DATE")
    private LocalDateTime commentDate;

    @Column(name = "COMMENT")
    private String comment;

    public Comment() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public LocalDateTime getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDateTime commentDate) {
        this.commentDate = commentDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    
}
