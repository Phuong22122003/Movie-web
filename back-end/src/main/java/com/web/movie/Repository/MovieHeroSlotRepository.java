package com.web.movie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.MovieHeroSlot;

@Repository
public interface MovieHeroSlotRepository extends JpaRepository<MovieHeroSlot, String> {

    @Query("From MovieHeroSlot where startTime <= CURRENT_TIMESTAMP and endTime >= CURRENT_TIMESTAMP")
    public List<MovieHeroSlot> findCurrentSlot();
}
