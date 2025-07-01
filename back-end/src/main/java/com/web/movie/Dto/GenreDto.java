package com.web.movie.Dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenreDto {
    private String id;
    private String name;
    private List<MovieDto> movies;
}
