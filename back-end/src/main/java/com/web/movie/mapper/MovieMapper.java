package com.web.movie.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.request.MovieRequestDto;
import com.web.movie.Entity.Movie;

@Mapper(componentModel="spring")
public interface MovieMapper {

    MovieDto toMovieDto(Movie movie);
    Movie toMovie(MovieRequestDto movie);
    List<MovieDto> toMovieDtos(List<Movie> movies);
}
