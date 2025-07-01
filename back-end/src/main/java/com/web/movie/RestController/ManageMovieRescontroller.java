package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.ResponseDto;
import com.web.movie.Dto.request.MovieRequestDto;
import com.web.movie.Entity.Movie;
import com.web.movie.Service.MovieService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/manage/movies")
@Tag(name="Admin")
public class ManageMovieRescontroller {
    @Autowired private MovieService movieService;
    @GetMapping("")
    public ResponseEntity<List<Movie>> getListMovie(){
        return ResponseEntity.ok().body(movieService.findAllMovies());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id){
        return  movieService.deleteMovie(id);
    }
    @PostMapping("")
    public ResponseEntity<?> add(@RequestPart(name = "image") MultipartFile image, @RequestPart(name = "video") MultipartFile video,@RequestPart("movie") MovieRequestDto movie){
  
        return ResponseEntity.ok().body(movieService.addMovie(image, video, movie));
    }
    @PatchMapping("")
    public ResponseEntity<ResponseDto> update(@RequestParam(name = "image",required = false) MultipartFile image,@RequestParam (name = "movie") String movieJson){
        ObjectMapper objectMapper = new ObjectMapper();
        Movie movie =null;
        try {
            movie = objectMapper.readValue(movieJson, Movie.class);
        } catch (Exception e) {
            ResponseDto error = new ResponseDto();
           
            error.setMessage("Moive format is not supportive");
            return ResponseEntity.badRequest().body(error);
        }
        return  movieService.update(image, movie);

    }
}
