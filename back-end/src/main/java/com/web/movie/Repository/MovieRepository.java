package com.web.movie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.movie.Entity.Movie;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Integer>{
    public Movie findMovieById(Integer id);
    @Query(value =  "EXEC findMovieByGenre :genre",nativeQuery = true)
    public List<Movie> findMovieByGenre(@Param("genre") Integer genre);
}
