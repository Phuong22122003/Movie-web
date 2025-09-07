package com.web.movie.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.web.movie.Entity.Movie;

import jakarta.transaction.Transactional;

public interface MovieRepository extends JpaRepository<Movie,Integer>{
    Page<Movie> findByCountryName(String countryId,Pageable pageable);

    @Query(value = """
            SELECT m.*
            FROM Movie m
            JOIN (
                SELECT MOVIE_ID
                FROM Movie_Genre
                WHERE GENRE_ID = :genreId
            ) mg ON m.ID = mg.MOVIE_ID ORDER BY m.ID
            OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
            """,
            nativeQuery = true)
    List<Movie> findMovieByGenreId(int genreId, int offset, int limit);

    @Transactional
    @Modifying
    @Query(value = "DELETE Movie WHERE id = :id")
    int deleteMovieById(int id);


    @Query(value = "SELECT * FROM MOVIE WHERE NAME LIKE %:keyword% OR DESCRIPTION LIKE %:keyword%",nativeQuery = true)
    List<Movie> searchMovies(String keyword);
}



