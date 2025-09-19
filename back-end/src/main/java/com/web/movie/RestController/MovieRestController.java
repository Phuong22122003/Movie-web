package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Service.MovieService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/movies")
@Tag(name = "MovieController")
public class MovieRestController {
    @Autowired private MovieService movieService;
    @GetMapping()
    public ResponseEntity<List<MovieDto>> getListMovie(@RequestParam(name = "offset",defaultValue = "0") int offset,
                                                    @RequestParam(name = "limit",defaultValue = "10")int limit){
        return ResponseEntity.ok().body(movieService.findMovies(offset, limit));
    }

    @GetMapping("/country/{name}")
    public ResponseEntity<List<MovieDto>> findListMovieByCountry(@PathVariable("name") String country,
    @RequestParam(name = "offset",defaultValue = "0") int offset, 
    @RequestParam(name = "limit", defaultValue = "10") int limit){
        return ResponseEntity.ok().body(movieService.findMoviesByCountry(country,offset,limit));
    }
    
    @GetMapping("/genres/{name}")
    public ResponseEntity<List<MovieDto>> findListMovieByGenre(@PathVariable("name") String genre,
    @RequestParam(name = "offset",defaultValue = "0") int offset, 
    @RequestParam(name = "limit", defaultValue = "10") int limit){
        return ResponseEntity.ok().body(movieService.findMoviesByGenre(genre,offset,limit));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MovieDto> findMovieById(@PathVariable("id") Integer id){
        return ResponseEntity.ok().body(movieService.findMovieById(id));
    }
    @GetMapping("/search")
    public ResponseEntity<Page<MovieDto>> searchMovie(@RequestParam("q") String q,@RequestParam("page_number") int pageNumber, @RequestParam("page_size") int pageSize){
        return ResponseEntity.ok().body(movieService.searchMovies(q, pageNumber, pageSize));
    }

    @GetMapping("/slots")
    public ResponseEntity<List<MovieDto>> getMovieHeroSlot(){
        return ResponseEntity.ok().body(movieService.getMovieSlot());
    }
    @GetMapping("/recently-update")
    public ResponseEntity<List<MovieDto>> getRecentlyUpdate(@RequestParam int limit){
        return ResponseEntity.ok().body(movieService.getRecentlyUpdated(limit));
    }
}
