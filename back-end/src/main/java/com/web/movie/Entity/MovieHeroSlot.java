package com.web.movie.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Movie_Hero_Slot")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MovieHeroSlot {
    @Id
    @Column(name = "ID")
    private String id;

    @ManyToOne
    @JoinColumn(name = "MOVIE_ID")
    private Movie movie;
    @Column(name = "SLOT_NAME")
    private String slotName;
    
    @Column(name = "START_TIME")
    private LocalDateTime startTime;
    
    @Column(name = "END_TIME")
    private LocalDateTime endTime;
}
