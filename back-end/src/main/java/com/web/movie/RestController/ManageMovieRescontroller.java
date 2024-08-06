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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.movie.Dto.ResponseDetail;
import com.web.movie.Entity.Movie;
import com.web.movie.Service.MovieService;

@RestController
@RequestMapping("/api/v1/manage/")
public class ManageMovieRescontroller {
    @Autowired private MovieService movieService;
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getListMovie(){
        return ResponseEntity.ok().body(movieService.findAllMovies());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id){
        return  movieService.deleteMovie(id);
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestParam(name = "image") MultipartFile image, @RequestParam(name = "video") MultipartFile video,@RequestParam("movieJson") String movieJson){
        ObjectMapper objectMapper = new ObjectMapper();
        Movie movie = null;
        try {
            movie= objectMapper.readValue(movieJson, Movie.class);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Moive format is not supportive");
        }

        return movieService.addMovie(image, video, movie);
    }
    @PatchMapping("/update")
    public ResponseEntity<ResponseDetail> update(@RequestParam(name = "image",required = false) MultipartFile image,@RequestParam (name = "movie") String movieJson){
        ObjectMapper objectMapper = new ObjectMapper();
        Movie movie =null;
        try {
            movie = objectMapper.readValue(movieJson, Movie.class);
        } catch (Exception e) {
            ResponseDetail error = new ResponseDetail();
            error.setIsError(true);
            error.setMessage("Moive format is not supportive");
            return ResponseEntity.badRequest().body(error);
        }
        return  movieService.update(image, movie);

    }
}
