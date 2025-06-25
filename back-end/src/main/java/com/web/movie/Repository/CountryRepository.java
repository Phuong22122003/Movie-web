package com.web.movie.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.Country;
@Repository
public interface CountryRepository  extends JpaRepository<Country,String>{
    public Country findByName(String name);
}
