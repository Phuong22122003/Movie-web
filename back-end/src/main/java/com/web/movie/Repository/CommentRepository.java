package com.web.movie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.movie.Entity.Comment;

public interface CommentRepository  extends JpaRepository<Comment,String>{
    @Query("FROM Comment c WHERE c.movie.id=:movieId ORDER BY commentAt DESC")
    public List<Comment> findCommentsByMovieId(@Param("movieId") Integer movieId);
}
