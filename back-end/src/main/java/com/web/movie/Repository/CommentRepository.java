package com.web.movie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.movie.Entity.Comment;
import com.web.movie.Entity.CommentKey;

public interface CommentRepository  extends JpaRepository<Comment,CommentKey>{
    @Query("FROM Comment WHERE movieId=:movieId")
    public List<Comment> findCommentsByMovieId(@Param("movieId") Integer movieId);
}
