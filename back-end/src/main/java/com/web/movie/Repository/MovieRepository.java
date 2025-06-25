package com.web.movie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.web.movie.Entity.Movie;

public interface MovieRepository extends JpaRepository<Movie,Integer>{
}



