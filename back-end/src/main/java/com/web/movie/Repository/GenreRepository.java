package com.web.movie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.Genre;
@Repository
public interface GenreRepository extends JpaRepository<Genre,Integer>{
    
}
