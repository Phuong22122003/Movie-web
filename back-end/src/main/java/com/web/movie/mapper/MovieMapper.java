package com.web.movie.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.request.MovieRequestDto;
import com.web.movie.Entity.Movie;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    @Mapping(target = "image_url", expression = "java(buildImageUrl(movie.getImageFileName()))")
    @Mapping(target = "movie_url", expression = "java(buildVideoUrl(movie.getVideoFileName()))")
    MovieDto toMovieDto(Movie movie);

    Movie toMovie(MovieRequestDto movie);

    List<MovieDto> toMovieDtos(List<Movie> movies);

    @Named("imageUrlBuilder")
    default String buildImageUrl(String imageFileName) {
        return "http://localhost:80/api/v1/resource/image/" + imageFileName;
    }

    @Named("videoUrlBuilder")
    default String buildVideoUrl(String videoFileName) {
        return "http://localhost:80/api/v1/resource/video/" + videoFileName;
    }
}
