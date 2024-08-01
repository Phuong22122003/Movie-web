package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Entity.Movie;
import com.web.movie.Service.MovieService;

@RestController
@RequestMapping("/api/v1/movie")
public class MovieRestController {
    @Autowired private MovieService movieService;
    @GetMapping("/list-movie")
    public ResponseEntity<List<Movie>> getListMovie(@RequestParam("genre") Integer genre, @RequestParam("id") Integer id){
    
        return ResponseEntity.ok().body(movieService.findMovieByGenre(genre,id));
    }
    @GetMapping("/detail")
    public ResponseEntity<Movie> getMovieInfo(@RequestParam("id") Integer id){
        return ResponseEntity.ok().body(movieService.findMovieById(id));
    }
    @GetMapping("/get")
    public ResponseEntity<MovieDto> getMovie(@RequestParam("id") Integer id){
        return ResponseEntity.ok().body(movieService.getMovie(id));
    }
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovie(@RequestParam("keyword") String keyword){
        return ResponseEntity.ok().body(movieService.seachMovie(keyword));
    }
}
