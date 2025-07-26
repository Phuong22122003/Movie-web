package com.web.movie.Dto.request;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieRequestDto {
    private String name;
    private String description;
    private String countryId;
    private List<Integer> genreIds;
}
