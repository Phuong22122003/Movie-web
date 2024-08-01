package com.web.movie.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Entity.Comment;
import com.web.movie.Entity.Movie;
import com.web.movie.Repository.CommentRepository;
import com.web.movie.Repository.MovieGenreRepository;
import com.web.movie.Repository.MovieRepository;

@Service
public class MovieService {
    @Autowired private MovieRepository movieRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private MovieGenreRepository movieGenreRepository;
    public List<Movie> findMovieByGenre(Integer genre,Integer id){
        List<Movie> listMovies;
        if(genre == 0) 
            listMovies = movieRepository.findAll();
        else
            listMovies = movieRepository.findMovieByGenre(genre);
        if(listMovies!=null&&id!=0)
            listMovies.removeIf(movie-> movie.getId()==id);
        return listMovies;
    }
    public Movie findMovieById(Integer id){
        return movieRepository.findMovieById(id);
    }

    public MovieDto getMovie(Integer id){
        Movie movie = findMovieById(id);
        List<Comment> comments = commentRepository.findCommentsByMovieId(id);
        MovieDto movieDto = new MovieDto();
        movieDto.setName(movie.getName());
        movieDto.setSource(movie.getSource());
        movieDto.setGenre(movieGenreRepository.findGenre(id));
        movieDto.setListComment(comments);
        return movieDto;
    }

    public List<Movie> seachMovie(String keyword){
        List<Movie> movies = movieRepository.findAll();
        List<Movie> results = new ArrayList<>();

        movies.forEach((movie)->{
            if(movie.getName().trim().toUpperCase().contains(keyword.trim().toUpperCase())|| 
            keyword.trim().toUpperCase().contains(movie.getName().trim().toUpperCase())){
                results.add(movie);
            }
        });
        return results;
    }
}
