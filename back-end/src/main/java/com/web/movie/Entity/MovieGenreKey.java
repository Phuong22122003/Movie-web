package com.web.movie.Entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class MovieGenreKey {
    private Integer genreId;
    private Integer movieId;
    
    public MovieGenreKey() {
    }
   
    public Integer getMovieId() {
        return movieId;
    }
    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public Integer getGenreId() {
        return genreId;
    }

    public void setGenreId(Integer genreId) {
        this.genreId = genreId;
    }
    
}
