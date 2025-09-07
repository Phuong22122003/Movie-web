package com.web.movie.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.Genre;
@Repository
public interface GenreRepository extends JpaRepository<Genre,Integer>{
    public Optional<Genre> findByName(String name);
}
