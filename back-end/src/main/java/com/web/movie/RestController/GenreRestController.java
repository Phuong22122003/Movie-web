package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Entity.Genre;
import com.web.movie.Repository.GenreRepository;

@RestController
@RequestMapping("/api/v1/genres")
public class GenreRestController {
    @Autowired private GenreRepository genreRepository;
    @GetMapping("list")
    public ResponseEntity<List<Genre>> findGenres(){
        return ResponseEntity.ok().body(genreRepository.findAll());
    }
}
