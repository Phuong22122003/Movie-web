package com.web.movie.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;

@Embeddable
public class CommentKey {
    private String username;
    private Integer movieId;
    private LocalDateTime commentDate;
    public CommentKey() {
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
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
   
    
}
