package com.web.movie.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Country")
public class Country {
    @Id
    @Column(name = "ID")
    private String id;
    @Column(name = "COUNTRY_NAME",nullable = false)
    private String name;
    
    @OneToMany(mappedBy = "country",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movie> movies;

    public Country() {
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<Movie> getMovies() {
        return movies;
    }
    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    
}
