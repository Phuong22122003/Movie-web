package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Entity.Movie;
import com.web.movie.Service.MovieService;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieRestController {
    @Autowired private MovieService movieService;
    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getListMovie(@RequestParam(required = false,defaultValue = "0") Integer id){
    
        return ResponseEntity.ok().body(movieService.findMoviesByGenreID(id));
    }

    @GetMapping("/quocgia/{country}")
    public ResponseEntity<List<Movie>> findListMovieByCountry(@PathVariable("country") String country){
        return ResponseEntity.ok().body(movieService.findMoviesByCountry(country));
    }
    
    @GetMapping("/detail")
    public ResponseEntity<Movie> findMovieById(@RequestParam("id") Integer id){
        return ResponseEntity.ok().body(movieService.findMovieById(id));
    }
    @GetMapping("/get")
    public ResponseEntity<MovieDto> findMovieDetailById(@RequestParam("id") Integer id){
        return ResponseEntity.ok().body(movieService.findMovieDetailById(id));
    }
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovie(@RequestParam("keyword") String keyword){
        return ResponseEntity.ok().body(movieService.seachMovie(keyword));
    }
}
