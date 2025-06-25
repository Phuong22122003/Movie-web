package com.web.movie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.movie.Entity.Country;
import com.web.movie.Repository.CountryRepository;

@RestController
@RequestMapping("/api/v1/countries")
public class CountryRestController {
    @Autowired private CountryRepository countryRepository;
    @GetMapping("/list")
    public ResponseEntity<List<Country>> findCountries(){
        return ResponseEntity.ok().body(countryRepository.findAll());
    }
}
