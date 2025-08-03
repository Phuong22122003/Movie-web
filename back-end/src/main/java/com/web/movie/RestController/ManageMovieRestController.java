package com.web.movie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.ResponseDto;
import com.web.movie.Dto.request.MovieRequestDto;
import com.web.movie.Service.MovieService;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/manage/movies")
@Tag(name="Admin")
public class ManageMovieRestController {
    @Autowired private MovieService movieService;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id){
        movieService.deleteMovie(id);
        return ResponseEntity.ok().body(ResponseDto.<String>builder().message("Delete movie successfully").build());
    }
    @PostMapping("")
    public ResponseEntity<MovieDto> add(@RequestPart(name = "image") MultipartFile image, 
                                        @RequestPart(name = "video") MultipartFile video,
                                        @RequestPart("movie") MovieRequestDto movie){
  
        return ResponseEntity.ok().body(movieService.addMovie(image, video, movie));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<MovieDto> update(@PathVariable("id") int id,
                                            @RequestPart(name = "image",required = false) MultipartFile image,
                                            @RequestPart(name = "video",required = false) MultipartFile video,
                                            @RequestPart("movie") MovieRequestDto movie){
        return ResponseEntity.ok().body(movieService.update(id,movie,image,video));
    }
}
