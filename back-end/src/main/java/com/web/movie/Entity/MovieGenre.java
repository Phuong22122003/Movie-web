package com.web.movie.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@IdClass(MovieGenreKey.class)
@Table(name="MOVIE_GENRE")
public class  MovieGenre {
    @Id
    @Column(name = "GENRE_ID")
    private String genreId;

    @Id
    @Column(name = "MOVIE_ID")
    private String movieId;

    public MovieGenre() {
    }

    public String getGenreId() {
        return genreId;
    }

    public void setGenreId(String genreId) {
        this.genreId = genreId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }


   

    
}
