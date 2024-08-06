package com.web.movie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.movie.Entity.MovieGenre;
import com.web.movie.Entity.MovieGenreKey;

public interface MovieGenreRepository extends JpaRepository<MovieGenre,MovieGenreKey>{
    @Query(value = "select top(1) GENRE_ID from MOVIE_GENRE where MOVIE_ID = :movieId  order by newId()",nativeQuery = true)
    public Integer findGenre(@Param("movieId") Integer moviedId);
}
